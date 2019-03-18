import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IContasPagarReceber } from 'app/shared/model/contas-pagar-receber.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { ContasPagarReceberService } from './contas-pagar-receber.service';

import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'jhi-contas-pagar-receber',
    templateUrl: './contas-pagar-receber.component.html'
})
export class ContasPagarReceberComponent implements OnInit, OnDestroy {
    currentAccount: any;
    contasPagarRecebers: IContasPagarReceber[];
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

    constructor(
        private contasPagarReceberService: ContasPagarReceberService,
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
            this.reverse = false;
            this.predicate = data.pagingParams.predicate;
        });
    }
    get loading(): boolean {
        return this.auxService.isLoading;
    }
    set loading(status: boolean) {
        this.auxService.isLoading = status;
    }

    loadAll() {
        this.loading = true;
        this.contasPagarReceberService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IContasPagarReceber[]>) => {
                    this.paginateContasPagarRecebers(res.body, res.headers);
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
        this.router.navigate(['/contas-pagar-receber'], {
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
            '/contas-pagar-receber',
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
        });
        this.registerChangeInContasPagarRecebers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IContasPagarReceber) {
        return item.id;
    }

    registerChangeInContasPagarRecebers() {
        this.eventSubscriber = this.eventManager.subscribe('contasPagarReceberListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'data') {
            result.push('data');
        }
        return result;
    }

    private paginateContasPagarRecebers(data: IContasPagarReceber[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.contasPagarRecebers = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
