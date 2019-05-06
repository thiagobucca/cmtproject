import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IRelatorioContasPagarReceber } from 'app/shared/model/relatorio-contas-pagar-receber.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { RelatorioContasPagarReceberService } from './relatorio-contas-pagar-receber.service';

import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';
import { ITipoOperacao } from 'app/shared/model/tipo-operacao.model';
import { TipoOperacaoService } from 'app/entities/tipo-operacao';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'jhi-relatorio-contas-pagar-receber',
    templateUrl: './relatorio-contas-pagar-receber.component.html'
})
export class RelatorioContasPagarReceberComponent implements OnInit, OnDestroy {
    relatorioContasPagarRecebers: IRelatorioContasPagarReceber[];
    currentAccount: any;
    eventSubscriber: Subscription;
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    queryCount: any;
    reverse: any;
    totalItems: number;
    totalValor: any;
    consulta: any;

    tipoOperacoes: ITipoOperacao[];
    constructor(
        private relatorioContasPagarReceberService: RelatorioContasPagarReceberService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private parseLinks: JhiParseLinks,
        private auxService: AuxiliarService,
        private ref: ChangeDetectorRef,
        private principal: Principal,
        private router: Router,
        private tipoOperacaoService: TipoOperacaoService
    ) {
        this.relatorioContasPagarRecebers = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.totalValor = 0;
        this.predicate = 'data';
        this.reverse = false;
        this.consulta = {
            dataIni: '',
            dataFim: '',
            tipoOperacaoId: undefined,
            tipoLancamento: undefined
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
        this.relatorioContasPagarReceberService
            .query({
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort(),
                data_inicial: this.consulta.dataIni,
                data_final: this.consulta.dataFim,
                tipoOperacaoId: this.consulta.tipoOperacaoId === undefined ? '' : this.consulta.tipoOperacaoId,
                tipoLancamento: this.consulta.tipoLancamento === undefined ? '' : this.consulta.tipoLancamento
            })
            .subscribe(
                (res: HttpResponse<IRelatorioContasPagarReceber[]>) => {
                    this.paginateRelatorioContasPagarRecebers(res.body, res.headers);
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

    reset() {
        this.totalValor = 0;
        this.page = 0;
        this.relatorioContasPagarRecebers = [];
        this.loadAll();
    }
    consultar() {
        this.relatorioContasPagarRecebers = [];
        this.totalValor = 0;
        this.page = 0;
        this.loadAll();
    }

    loadPage(page) {
        this.page = page;
        this.loadAll();
    }

    ngOnInit() {
        if (sessionStorage.getItem('dadosConsultaConta') !== '' && sessionStorage.getItem('dadosConsultaConta') !== null) {
            this.consulta = JSON.parse(sessionStorage.getItem('dadosConsultaConta'));
            sessionStorage.setItem('dadosConsultaConta', '');
            this.loadAll();
        }
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.tipoOperacaoService.query({ sort: ['nomeOperacao,asc'] }).subscribe(
            (res: HttpResponse<ITipoOperacao[]>) => {
                this.tipoOperacoes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.registerChangeInRelatorioContasPagarRecebers();
    }

    ngOnDestroy() {
        if (this.eventSubscriber !== undefined) this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRelatorioContasPagarReceber) {
        return item.id;
    }

    registerChangeInRelatorioContasPagarRecebers() {
        this.eventSubscriber = this.eventManager.subscribe('relatorioContasPagarReceberListModification', response => this.reset());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'data') {
            result.push('data');
        }
        return result;
    }

    private paginateRelatorioContasPagarRecebers(data: IRelatorioContasPagarReceber[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        for (let i = 0; i < data.length; i++) {
            this.totalValor += data[i].valor;
            this.relatorioContasPagarRecebers.push(data[i]);
        }
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
    detalhar(parametros: [string, any?, string?]) {
        sessionStorage.setItem('dadosConsultaConta', JSON.stringify(this.consulta));
        this.loading = true;
        this.router.navigate(parametros);
    }
}
