import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ITEMS_PER_PAGE } from 'app/shared';
import { Principal } from 'app/core';
import { IMembro, Membro } from 'app/shared/model/membro.model';
import { MembroDeleteDialogComponent } from './membro-delete-dialog.component';

import { MembroService } from './membro.service';
import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';

import { ILojaMaconica } from 'app/shared/model/loja-maconica.model';
import { LojaMaconicaService } from 'app/entities/loja-maconica';

@Component({
    selector: 'jhi-membro',
    templateUrl: './membro.component.html'
})
export class MembroComponent implements OnInit, OnDestroy {
    currentAccount: any;
    users: Membro[];
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
    lojas: ILojaMaconica[];
    consulta: any;
    lojaMaconicaId: any;
    isLojaMaconica: boolean;
    constructor(
        private userService: MembroService,
        private alertService: JhiAlertService,
        private principal: Principal,
        private parseLinks: JhiParseLinks,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private modalService: NgbModal,
        private auxService: AuxiliarService,
        private lojaMaconicaService: LojaMaconicaService,
        private ref: ChangeDetectorRef
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
        this.isLojaMaconica = false;
        this.consulta = {
            lojaMaconicaId: '',
            isLojaMaconica: false
        };
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
            if (this.currentAccount !== undefined && this.currentAccount.authorities.find(x => x === 'ROLE_LOJA_MACONICA')) {
                if (this.currentAccount.lojaMaconicaId !== undefined) {
                    this.consulta.lojaMaconicaId = this.currentAccount.lojaMaconicaId;
                    this.consulta.isLojaMaconica = true;
                }
            }
            this.loadAll();
            this.registerChangeInUsers();
        });
        this.lojaMaconicaService.query().subscribe(
            (res: HttpResponse<ILojaMaconica[]>) => {
                this.lojas = res.body;
                this.loading = false;
                this.ref.detectChanges();
            },
            (res: HttpErrorResponse) => {
                this.onError(res.message);
                this.loading = false;
                this.ref.detectChanges();
            }
        );
    }

    ngOnDestroy() {
        this.routeData.unsubscribe();
    }

    registerChangeInUsers() {
        this.eventManager.subscribe('membroListModification', response => this.loadAll());
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

    setarLoja(codLoja?: any) {
        if (sessionStorage.getItem('consultaMembro') !== '' && sessionStorage.getItem('consultaMembro') !== null) {
            this.consulta = JSON.parse(sessionStorage.getItem('consultaMembro'));
            sessionStorage.setItem('consultaMembro', '');
        } else {
            this.consulta.lojaMaconicaId = codLoja;
            this.consulta.isLojaMaconica = false;
        }
        this.loadAll();
    }

    loadAll() {
        this.loading = true;

        if (this.consulta.lojaMaconicaId !== undefined && this.consulta.lojaMaconicaId !== '') {
            this.userService
                .queryIdLoja(
                    {
                        page: this.page - 1,
                        size: this.itemsPerPage,
                        sort: this.sort()
                    },
                    this.consulta.lojaMaconicaId
                )
                .subscribe(
                    (res: HttpResponse<Membro[]>) => {
                        this.loading = false;
                        this.onSuccess(res.body, res.headers);
                        this.ref.detectChanges();
                    },
                    (res: HttpResponse<any>) => {
                        this.loading = false;
                        this.onError(res.body);
                        this.ref.detectChanges();
                    }
                );
        } /* else {
            this.userService
                .queryIdLoja({
                    page: this.page - 1,
                    size: this.itemsPerPage,
                    sort: this.sort()
                },0)
                .subscribe(
                    (res: HttpResponse<Membro[]>) => {
                        this.loading = false;
                        this.onSuccess(res.body, res.headers);
                        this.ref.detectChanges();
                    },
                    (res: HttpResponse<any>) => {
                        this.loading = false;
                        this.onError(res.body);
                        this.ref.detectChanges();
                    }
                );
        } */
    }
    detalhar(parametros: []) {
        this.loading = true;
        this.router.navigate(parametros);
        sessionStorage.setItem('consultaMembro', JSON.stringify(this.consulta));
    }

    onChangeLoja(value: any) {
        this.consulta.lojaMaconicaId = value === undefined ? '' : value;
        this.loadAll();
    }
    trackIdentity(index, item: Membro) {
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
        this.router.navigate(['/membro'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    deleteUser(user: Membro) {
        const modalRef = this.modalService.open(MembroDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
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
