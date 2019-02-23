import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { ChangeDetectorRef } from '@angular/core';

import { IAgendaEventos } from 'app/shared/model/agenda-eventos.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { AgendaEventosService } from './agenda-eventos.service';
import { AuxiliarService } from 'app/shared/services/auxiliar.service';

@Component({
    selector: 'jhi-agenda-eventos',
    templateUrl: './agenda-eventos.component.html'
})
export class AgendaEventosComponent implements OnInit, OnDestroy, AfterViewInit {
    currentAccount: any;
    agendaEventos: IAgendaEventos[];
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
        private agendaEventosService: AgendaEventosService,
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
    }
    get loading(): boolean {
        return this.auxService.isLoading;
    }
    set loading(status: boolean) {
        this.auxService.isLoading = status;
    }

    async loadAll() {
        await this.agendaEventosService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IAgendaEventos[]>) => {
                    this.paginateAgendaEventos(res.body, res.headers);
                    this.loading = false;
                    this.ref.detectChanges();
                },
                (res: HttpErrorResponse) => {
                    this.loading = false;
                    this.ref.detectChanges();
                    this.onError(res.message);
                }
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/agenda-eventos'], {
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
            '/agenda-eventos',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.loading = true;
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        this.registerChangeInAgendaEventos();
    }
    ngAfterViewInit() {}

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAgendaEventos) {
        return item.id;
    }

    registerChangeInAgendaEventos() {
        this.eventSubscriber = this.eventManager.subscribe('agendaEventosListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateAgendaEventos(data: IAgendaEventos[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.agendaEventos = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
