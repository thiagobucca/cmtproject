import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IContasPagarReceber } from 'app/shared/model/contas-pagar-receber.model';
import { ContasPagarReceberService } from './contas-pagar-receber.service';
import { IUsuario } from 'app/shared/model/usuario.model';
import { UsuarioService } from 'app/entities/usuario';
import { ILojaMaconica } from 'app/shared/model/loja-maconica.model';
import { LojaMaconicaService } from 'app/entities/loja-maconica';
import { IEstabelecimentoComercial } from 'app/shared/model/estabelecimento-comercial.model';
import { EstabelecimentoComercialService } from 'app/entities/estabelecimento-comercial';
import { ITipoOperacao } from 'app/shared/model/tipo-operacao.model';
import { TipoOperacaoService } from 'app/entities/tipo-operacao';

@Component({
    selector: 'jhi-contas-pagar-receber-update',
    templateUrl: './contas-pagar-receber-update.component.html'
})
export class ContasPagarReceberUpdateComponent implements OnInit {
    contasPagarReceber: IContasPagarReceber;
    isSaving: boolean;

    usuarios: IUsuario[];

    lojamaconicas: ILojaMaconica[];

    estabelecimentocomercials: IEstabelecimentoComercial[];

    tipooperacaos: ITipoOperacao[];
    data: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private contasPagarReceberService: ContasPagarReceberService,
        private usuarioService: UsuarioService,
        private lojaMaconicaService: LojaMaconicaService,
        private estabelecimentoComercialService: EstabelecimentoComercialService,
        private tipoOperacaoService: TipoOperacaoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ contasPagarReceber }) => {
            this.contasPagarReceber = contasPagarReceber;
            this.data = this.contasPagarReceber.data != null ? this.contasPagarReceber.data.format(DATE_TIME_FORMAT) : null;
        });
        this.usuarioService.query({ filter: 'contaspagarreceber-is-null' }).subscribe(
            (res: HttpResponse<IUsuario[]>) => {
                if (!this.contasPagarReceber.usuario || !this.contasPagarReceber.usuario.id) {
                    this.usuarios = res.body;
                } else {
                    this.usuarioService.find(this.contasPagarReceber.usuario.id).subscribe(
                        (subRes: HttpResponse<IUsuario>) => {
                            this.usuarios = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.lojaMaconicaService.query({ filter: 'contaspagarreceber-is-null' }).subscribe(
            (res: HttpResponse<ILojaMaconica[]>) => {
                if (!this.contasPagarReceber.lojaMaconica || !this.contasPagarReceber.lojaMaconica.id) {
                    this.lojamaconicas = res.body;
                } else {
                    this.lojaMaconicaService.find(this.contasPagarReceber.lojaMaconica.id).subscribe(
                        (subRes: HttpResponse<ILojaMaconica>) => {
                            this.lojamaconicas = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.estabelecimentoComercialService.query({ filter: 'contaspagarreceber-is-null' }).subscribe(
            (res: HttpResponse<IEstabelecimentoComercial[]>) => {
                if (!this.contasPagarReceber.estabelecimentoComercial || !this.contasPagarReceber.estabelecimentoComercial.id) {
                    this.estabelecimentocomercials = res.body;
                } else {
                    this.estabelecimentoComercialService.find(this.contasPagarReceber.estabelecimentoComercial.id).subscribe(
                        (subRes: HttpResponse<IEstabelecimentoComercial>) => {
                            this.estabelecimentocomercials = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.tipoOperacaoService.query({ filter: 'contaspagarreceber-is-null' }).subscribe(
            (res: HttpResponse<ITipoOperacao[]>) => {
                if (!this.contasPagarReceber.tipoOperacao || !this.contasPagarReceber.tipoOperacao.id) {
                    this.tipooperacaos = res.body;
                } else {
                    this.tipoOperacaoService.find(this.contasPagarReceber.tipoOperacao.id).subscribe(
                        (subRes: HttpResponse<ITipoOperacao>) => {
                            this.tipooperacaos = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
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

    trackUsuarioById(index: number, item: IUsuario) {
        return item.id;
    }

    trackLojaMaconicaById(index: number, item: ILojaMaconica) {
        return item.id;
    }

    trackEstabelecimentoComercialById(index: number, item: IEstabelecimentoComercial) {
        return item.id;
    }

    trackTipoOperacaoById(index: number, item: ITipoOperacao) {
        return item.id;
    }
}
