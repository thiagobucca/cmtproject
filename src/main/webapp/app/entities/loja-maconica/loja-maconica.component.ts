import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ILojaMaconica } from 'app/shared/model/loja-maconica.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { LojaMaconicaService } from './loja-maconica.service';

import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'jhi-loja-maconica',
    templateUrl: './loja-maconica.component.html'
})
export class LojaMaconicaComponent implements OnInit, OnDestroy {
    currentAccount: any;
    lojaMaconicas: ILojaMaconica[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    roleLoja: any;
    constructor(
        private lojaMaconicaService: LojaMaconicaService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private auxService: AuxiliarService,
        private ref: ChangeDetectorRef
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.roleLoja = {
            isLojaMaconica: false,
            codLoja: undefined
        };
    }

    get loading(): boolean {
        return this.auxService.isLoading;
    }
    set loading(status: boolean) {
        this.auxService.isLoading = status;
    }

    loadAll() {
        this.loading = true;
        this.lojaMaconicaService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<ILojaMaconica[]>) => {
                    this.paginateLojaMaconicas(res.body, res.headers);
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
    detalhar(parametros: []) {
        this.loading = true;
        this.router.navigate(parametros);
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/loja-maconica'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/loja-maconica',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
            if (this.currentAccount !== undefined && this.currentAccount.authorities.find(x => x === 'ROLE_LOJA_MACONICA')) {
                if (this.currentAccount.lojaMaconicaId !== undefined) {
                    this.roleLoja.codLoja = this.currentAccount.lojaMaconicaId;
                }
                this.roleLoja.isLojaMaconica = true;
            }
        });
        this.registerChangeInLojaMaconicas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILojaMaconica) {
        return item.id;
    }

    registerChangeInLojaMaconicas() {
        this.eventSubscriber = this.eventManager.subscribe('lojaMaconicaListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateLojaMaconicas(data: ILojaMaconica[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.lojaMaconicas = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
