import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IContasPagarReceber } from 'app/shared/model/contas-pagar-receber.model';
import { ContasPagarReceberService } from './contas-pagar-receber.service';
import { JhiAlertService } from 'ng-jhipster';

import { ILojaMaconica } from 'app/shared/model/loja-maconica.model';
import { LojaMaconicaService } from 'app/entities/loja-maconica';

import { IEstabelecimentoComercial } from 'app/shared/model/estabelecimento-comercial.model';
import { EstabelecimentoComercialService } from 'app/entities/estabelecimento-comercial';

import { UserService, IUser } from 'app/core';

import { ITipoOperacao } from 'app/shared/model/tipo-operacao.model';
import { TipoOperacaoService } from 'app/entities/tipo-operacao';

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
    usuarios: IUser[];
    tipoOperacoes: ITipoOperacao[];

    constructor(
        private contasPagarReceberService: ContasPagarReceberService,
        private activatedRoute: ActivatedRoute,
        private lojaMaconicaService: LojaMaconicaService,
        private estabelecimentoComercialService: EstabelecimentoComercialService,
        private userService: UserService,
        private tipoOperacaoService: TipoOperacaoService,
        private jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ contasPagarReceber }) => {
            this.contasPagarReceber = contasPagarReceber;
            this.data = this.contasPagarReceber.data != null ? this.contasPagarReceber.data.format(DATE_TIME_FORMAT) : null;
        });

        this.lojaMaconicaService.query({ filter: 'lojaMaconica-is-null' }).subscribe(
            (res: HttpResponse<ILojaMaconica[]>) => {
                this.lojas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.estabelecimentoComercialService.query({ filter: 'estabelecimentoComercial-is-null' }).subscribe(
            (res: HttpResponse<IEstabelecimentoComercial[]>) => {
                this.estabelecimentos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.userService.findByStatus(true).subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.usuarios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.tipoOperacaoService.query({ filter: 'tipoOperacao-is-null' }).subscribe(
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
        this.contasPagarReceber.data = this.data != null ? moment(this.data, DATE_TIME_FORMAT) : null;
        if (this.contasPagarReceber.id !== undefined) {
            this.subscribeToSaveResponse(this.contasPagarReceberService.update(this.contasPagarReceber));
        } else {
            this.subscribeToSaveResponse(this.contasPagarReceberService.create(this.contasPagarReceber));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IContasPagarReceber>>) {
        result.subscribe((res: HttpResponse<IContasPagarReceber>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
    trackById(index: number, item: any) {
        return item.id;
    }
}
