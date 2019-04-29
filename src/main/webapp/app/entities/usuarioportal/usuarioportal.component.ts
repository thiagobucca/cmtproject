import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ITEMS_PER_PAGE } from 'app/shared';
import { Principal } from 'app/core';
import { UsuarioportalDeleteDialogComponent } from './usuarioportal-delete-dialog.component';

import { UsuarioportalService } from './index';
import { IUsuarioPortal, UsuarioPortal } from 'app/shared/model/usuarioportal.model';
import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'jhi-usuarioportal',
    templateUrl: './usuarioportal.component.html'
})
export class UsuarioportalComponent implements OnInit, OnDestroy {
    currentAccount: any;
    users: UsuarioPortal[];
    error: any;
    success: any;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        private userService: UsuarioportalService,
        private alertService: JhiAlertService,
        private principal: Principal,
        private parseLinks: JhiParseLinks,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private modalService: NgbModal,
        private auxService: AuxiliarService,
        private ref: ChangeDetectorRef
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
            this.loadAll();
            this.registerChangeInUsers();
        });
    }

    ngOnDestroy() {
        this.routeData.unsubscribe();
    }

    registerChangeInUsers() {
        this.eventManager.subscribe('userListModification', response => this.loadAll());
    }

    setActive(user, isActivated) {
        user.activated = isActivated;

        this.userService.update(user).subscribe(response => {
            if (response.status === 200) {
                this.error = null;
                this.success = 'OK';
                this.loadAll();
            } else {
                this.success = null;
                this.error = 'ERROR';
            }
        });
    }

    loadAll() {
        this.loading = true;
        if (this.currentAccount !== undefined && this.currentAccount.authorities.find(x => x === 'ROLE_LOJA_MACONICA')) {
            if (this.currentAccount.lojaMaconicaId !== undefined) {
                this.userService
                    .queryIdLoja(
                        {
                            page: this.page - 1,
                            size: this.itemsPerPage,
                            sort: this.sort()
                        },
                        this.currentAccount.lojaMaconicaId
                    )
                    .subscribe(
                        (res: HttpResponse<UsuarioPortal[]>) => {
                            this.loading = false;
                            const lstFiltrada = res.body.filter(
                                p => p.authorities.indexOf('ROLE_ADMIN') > -1 || p.authorities.indexOf('ROLE_USER') > -1
                            );
                            if (lstFiltrada !== undefined && lstFiltrada !== null) {
                                lstFiltrada.forEach(item => {
                                    res.body.splice(res.body.indexOf(item), 1);
                                });
                            }
                            this.onSuccess(res.body, res.headers);
                        },
                        (res: HttpResponse<any>) => {
                            this.loading = false;
                            this.ref.detectChanges();
                            this.onError(res.body);
                        }
                    );
            }
        } else if (this.currentAccount !== undefined && this.currentAccount.authorities.find(x => x === 'ROLE_ADMIN')) {
            this.userService
                .query({
                    page: this.page - 1,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<UsuarioPortal[]>) => {
                        this.loading = false;
                        this.onSuccess(res.body, res.headers);
                        this.ref.detectChanges();
                    },
                    (res: HttpResponse<any>) => {
                        this.loading = false;
                        this.ref.detectChanges();
                        this.onError(res.body);
                    }
                );
        } else {
            this.userService
                .query({
                    page: this.page - 1,
                    size: this.itemsPerPage,
                    sort: this.sort(),
                    isPortal: true
                })
                .subscribe(
                    (res: HttpResponse<UsuarioPortal[]>) => {
                        this.loading = false;
                        const lstFiltrada = res.body.filter(p => p.authorities.indexOf('ROLE_ADMIN') > -1);
                        if (lstFiltrada !== undefined && lstFiltrada !== null) {
                            lstFiltrada.forEach(item => {
                                res.body.splice(res.body.indexOf(item), 1);
                            });
                        }
                        this.onSuccess(res.body, res.headers);
                        this.ref.detectChanges();
                    },
                    (res: HttpResponse<any>) => {
                        this.loading = false;
                        this.ref.detectChanges();
                        this.onError(res.body);
                    }
                );
        }
    }
    detalhar(parametros: [string, any?, string?]) {
        this.loading = true;
        this.router.navigate(parametros);
    }
    trackIdentity(index, item: UsuarioPortal) {
        return item.id;
    }
    get loading(): boolean {
        return this.auxService.isLoading;
    }
    set loading(status: boolean) {
        this.auxService.isLoading = status;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/usuarioportal'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    deleteUser(user: UsuarioPortal) {
        const modalRef = this.modalService.open(UsuarioportalDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.user = user;
        modalRef.result.then(
            result => {
                // Left blank intentionally, nothing to do here
            },
            reason => {
                // Left blank intentionally, nothing to do here
            }
        );
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.users = data;
        this.ref.detectChanges();
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/usuarioportal',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }
}
