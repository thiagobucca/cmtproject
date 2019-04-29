import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IRelatorioCupomCmt } from 'app/shared/model/relatorio-cupom-cmt.model';
import { Principal } from 'app/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ITEMS_PER_PAGE } from 'app/shared';
import { RelatorioCupomCmtService } from './relatorio-cupom-cmt.service';

import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';

import { ILojaMaconica } from 'app/shared/model/loja-maconica.model';
import { LojaMaconicaService } from 'app/entities/loja-maconica';

import { IEstabelecimentoComercial } from 'app/shared/model/estabelecimento-comercial.model';
import { EstabelecimentoComercialService } from 'app/entities/estabelecimento-comercial';

import { IGrupoComercial } from 'app/shared/model/grupo-comercial.model';
import { GrupoComercialService } from 'app/entities/grupo-comercial/grupo-comercial.service';

@Component({
    selector: 'jhi-relatorio-cupom-cmt',
    templateUrl: './relatorio-cupom-cmt.component.html'
})
export class RelatorioCupomCmtComponent implements OnInit, OnDestroy {
    relatorioCupomCmts: IRelatorioCupomCmt[];
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
    totalValorLoja: any;
    totalValorCMT: any;
    estabelecimentos: IEstabelecimentoComercial[];
    lojas: ILojaMaconica[];
    consulta: any;
    grupos: IGrupoComercial[];
    constructor(
        private relatorioCupomCmtService: RelatorioCupomCmtService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private parseLinks: JhiParseLinks,
        private auxService: AuxiliarService,
        private ref: ChangeDetectorRef,
        private router: Router,
        private estabelecimentoComercialService: EstabelecimentoComercialService,
        private lojaMaconicaService: LojaMaconicaService,
        private principal: Principal,
        private grupoComercialService: GrupoComercialService
    ) {
        this.totalValor = 0;
        this.totalValorLoja = 0;
        this.totalValorCMT = 0;
        this.relatorioCupomCmts = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'data';
        this.reverse = false;
        this.consulta = {
            dataIni: '',
            dataFim: '',
            estabelecimentoId: undefined,
            grupoId: undefined,
            lojaMaconicaId: undefined,
            isLojaMaconica: false,
            isEstabelecimento: false,
            isGrupo: false
        };
    }
    consultar() {
        this.relatorioCupomCmts = [];
        this.totalValor = 0;
        this.totalValorLoja = 0;
        this.totalValorCMT = 0;
        this.page = 0;
        this.loadAll();
    }
    loadAll() {
        if (
            (this.consulta.isEstabelecimento && this.consulta.estabelecimentoId !== undefined) ||
            (this.consulta.isLojaMaconica && this.consulta.lojaMaconicaId !== undefined) ||
            (!this.consulta.isEstabelecimento && !this.consulta.isLojaMaconica)
        ) {
            this.loading = true;
            this.ref.detectChanges();
            this.relatorioCupomCmtService
                .query({
                    page: this.page,
                    size: this.itemsPerPage,
                    sort: this.sort(),
                    data_inicial: this.consulta.dataIni,
                    data_final: this.consulta.dataFim,
                    estabelecimentoId: this.consulta.estabelecimentoId === undefined ? '' : this.consulta.estabelecimentoId,
                    lojaMaconicaId: this.consulta.lojaMaconicaId === undefined ? '' : this.consulta.lojaMaconicaId,
                    grupoId: this.consulta.grupoId === undefined ? '' : this.consulta.grupoId
                })
                .subscribe(
                    (res: HttpResponse<IRelatorioCupomCmt[]>) => {
                        this.paginateRelatorioCupomCmts(res.body, res.headers);
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
    }

    get loading(): boolean {
        return this.auxService.isLoading;
    }
    set loading(status: boolean) {
        this.auxService.isLoading = status;
    }
    reset() {
        this.totalValor = 0;
        this.totalValorLoja = 0;
        this.totalValorCMT = 0;
        this.page = 0;
        this.relatorioCupomCmts = [];
        this.loadAll();
    }

    loadPage(page) {
        this.page = page;
        this.loadAll();
    }

    ngOnInit() {
        if (sessionStorage.getItem('dadosConsulta') !== '' && sessionStorage.getItem('dadosConsulta') !== null) {
            this.consulta = JSON.parse(sessionStorage.getItem('dadosConsulta'));
            sessionStorage.setItem('dadosConsulta', '');
            this.loadAll();
        }
        this.principal.identity().then(account => {
            this.currentAccount = account;
            if (this.currentAccount !== undefined) {
                if (this.currentAccount.authorities.find(x => x === 'ROLE_LOJA_MACONICA')) {
                    this.consulta.isLojaMaconica = true;
                    if (this.currentAccount.lojaMaconicaId !== undefined && this.currentAccount.lojaMaconicaId !== null) {
                        this.consulta.lojaMaconicaId = this.currentAccount.lojaMaconicaId;
                    }
                }
                if (this.currentAccount.authorities.find(x => x === 'ROLE_ESTABELECIMENTO_COMERCIAL')) {
                    this.consulta.isGrupo = true;
                    if (this.currentAccount.grupoId !== undefined && this.currentAccount.grupoId !== null) {
                        this.consulta.grupoId = this.currentAccount.grupoId;
                        this.loadRelacaoEstabelecimento(this.consulta.grupoId);
                    }
                    if (
                        this.currentAccount.estabelecimentoComercialId !== undefined &&
                        this.currentAccount.estabelecimentoComercialId !== null
                    ) {
                        this.consulta.isEstabelecimento = true;
                        this.consulta.estabelecimentoId = this.currentAccount.estabelecimentoComercialId;
                    }
                }
            }
        });
        this.grupoComercialService.query({ bolAtivo: true, size: 1000, sort: ['nome,asc'] }).subscribe(
            (res: HttpResponse<IGrupoComercial[]>) => {
                this.grupos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.lojaMaconicaService.query({ sort: ['nome,asc'] }).subscribe(
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
        this.registerChangeInRelatorioCupomCmts();
    }

    loadRelacaoEstabelecimento(event) {
        this.loading = true;
        this.estabelecimentoComercialService.getByGrupo(event, { sort: ['nome,asc'] }).subscribe(
            (res: HttpResponse<IEstabelecimentoComercial[]>) => {
                this.estabelecimentos = res.body;
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
    detalhar(parametros: [string, any?, string?]) {
        sessionStorage.setItem('dadosConsulta', JSON.stringify(this.consulta));
        this.loading = true;
        this.router.navigate(parametros);
    }
    ngOnDestroy() {
        if (this.eventSubscriber !== undefined) {
            this.eventManager.destroy(this.eventSubscriber);
        }
    }

    trackId(index: number, item: IRelatorioCupomCmt) {
        return item.id;
    }

    registerChangeInRelatorioCupomCmts() {
        this.eventSubscriber = this.eventManager.subscribe('relatorioCupomCmtListModification', response => this.reset());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateRelatorioCupomCmts(data: IRelatorioCupomCmt[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        for (let i = 0; i < data.length; i++) {
            this.totalValor += data[i].valor;
            this.totalValorLoja += data[i].valorLoja;
            this.totalValorCMT += data[i].valorCMT;
            this.relatorioCupomCmts.push(data[i]);
        }
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackById(index: number, item: any) {
        return item.id;
    }
}
