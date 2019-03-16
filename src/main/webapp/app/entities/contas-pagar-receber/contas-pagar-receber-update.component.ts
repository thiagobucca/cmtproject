import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT, DATE_FORMAT } from 'app/shared/constants/input.constants';

import { IContasPagarReceber } from 'app/shared/model/contas-pagar-receber.model';
import { ContasPagarReceberService } from './contas-pagar-receber.service';
import { JhiAlertService } from 'ng-jhipster';

import { ILojaMaconica } from 'app/shared/model/loja-maconica.model';
import { LojaMaconicaService } from 'app/entities/loja-maconica';

import { IEstabelecimentoComercial } from 'app/shared/model/estabelecimento-comercial.model';
import { EstabelecimentoComercialService } from 'app/entities/estabelecimento-comercial';

import { Principal, UserService, User } from 'app/core';

import { ITipoOperacao } from 'app/shared/model/tipo-operacao.model';
import { TipoOperacaoService } from 'app/entities/tipo-operacao';

import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'jhi-contas-pagar-receber-update',
    templateUrl: './contas-pagar-receber-update.component.html'
})
export class ContasPagarReceberUpdateComponent implements OnInit {
    contasPagarReceber: IContasPagarReceber;
    isSaving: boolean;
    data: string;
    lojas: ILojaMaconica[];
    estabelecimentos: IEstabelecimentoComercial[];
    tipoOperacoes: ITipoOperacao[];
    currentAccount: any;
    isLoja: boolean;
    isEstabelecimento: boolean;
    constructor(
        private contasPagarReceberService: ContasPagarReceberService,
        private activatedRoute: ActivatedRoute,
        private lojaMaconicaService: LojaMaconicaService,
        private estabelecimentoComercialService: EstabelecimentoComercialService,
        private userService: UserService,
        private tipoOperacaoService: TipoOperacaoService,
        private principal: Principal,
        private jhiAlertService: JhiAlertService,
        private auxService: AuxiliarService,
        private ref: ChangeDetectorRef
    ) {
        this.isLoja = true;
        this.isEstabelecimento = true;
    }
    get loading(): boolean {
        return this.auxService.isLoading;
    }
    set loading(status: boolean) {
        this.auxService.isLoading = status;
    }

    ngOnInit() {
        this.isSaving = false;
        this.loading = true;
        this.principal.identity().then(account => {
            this.currentAccount = account;
            this.loading = false;
            this.ref.detectChanges();
        });

        this.activatedRoute.data.subscribe(({ contasPagarReceber }) => {
            this.contasPagarReceber = contasPagarReceber;
            this.data = this.contasPagarReceber.data != null ? this.contasPagarReceber.data.format(DATE_FORMAT) : null;
            this.isLoja =
                this.contasPagarReceber.estabelecimentoComercialId === undefined ||
                this.contasPagarReceber.estabelecimentoComercialId === null;
            this.isEstabelecimento =
                this.contasPagarReceber.lojaMaconicaId === undefined || this.contasPagarReceber.lojaMaconicaId === null;
        });

        this.lojaMaconicaService.findByStatus(true, { size: 1000, sort: ['nome,asc'] }).subscribe(
            (res: HttpResponse<ILojaMaconica[]>) => {
                this.lojas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.estabelecimentoComercialService.findByStatus(true, { size: 1000, sort: ['nome,asc'] }).subscribe(
            (res: HttpResponse<IEstabelecimentoComercial[]>) => {
                this.estabelecimentos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.tipoOperacaoService.query({ bolAtivo: true }).subscribe(
            (res: HttpResponse<ITipoOperacao[]>) => {
                this.tipoOperacoes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.loading = true;
        this.contasPagarReceber.data = this.data != null ? moment(this.data, DATE_TIME_FORMAT) : null;
        this.contasPagarReceber.estabelecimento = null;
        this.contasPagarReceber.lojaMaconica = null;
        this.contasPagarReceber.tipoLancamento = null;
        this.contasPagarReceber.tipoOperacao = null;
        this.contasPagarReceber.usuario = null;
        this.contasPagarReceber.usuarioId = this.currentAccount.id;
        if (this.contasPagarReceber.id !== undefined) {
            this.subscribeToSaveResponse(this.contasPagarReceberService.update(this.contasPagarReceber));
        } else {
            this.subscribeToSaveResponse(this.contasPagarReceberService.create(this.contasPagarReceber));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IContasPagarReceber>>) {
        result.subscribe(
            (res: HttpResponse<IContasPagarReceber>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => {
                this.onSaveError();
                if (res.error !== undefined) {
                    this.onError(res.error.title);
                } else {
                    this.onError(res.message);
                }
            }
        );
    }
    onChangeLojaMaconica(value) {
        this.isEstabelecimento = value === undefined;
        this.contasPagarReceber.estabelecimentoComercialId = undefined;
    }
    onChangeEstabelecimentoComercial(value) {
        this.isLoja = value === undefined;
        this.contasPagarReceber.lojaMaconicaId = undefined;
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.loading = false;
        this.ref.detectChanges();
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
        this.loading = false;
        this.ref.detectChanges();
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
    trackById(index: number, item: any) {
        return item.id;
    }
}
