import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IComunicacaoPush } from 'app/shared/model/comunicacao-push.model';
import { ComunicacaoPushService } from './comunicacao-push.service';
import { IComunicacaoPushLoja, ComunicacaoPushLoja } from 'app/shared/model/comunicacao-push-loja.model';
import { ComunicacaoPushLojaService } from 'app/entities/comunicacao-push-loja';
import { JhiAlertService } from 'ng-jhipster';
import { ILojaMaconica } from 'app/shared/model/loja-maconica.model';
import { LojaMaconicaService } from 'app/entities/loja-maconica';
import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
    selector: 'jhi-comunicacao-push-update',
    templateUrl: './comunicacao-push-update.component.html'
})
export class ComunicacaoPushUpdateComponent implements OnInit {
    comunicacaoPush: IComunicacaoPush;
    isSaving: boolean;
    lojas: ILojaMaconica[];
    pushLoja: IComunicacaoPushLoja[];
    lojasSelecionadas: any[];
    itemSelecionado: any[];
    constructor(
        private comunicacaoPushService: ComunicacaoPushService,
        private activatedRoute: ActivatedRoute,
        private lojaMaconicaService: LojaMaconicaService,
        private comunicacaoPushLojaService: ComunicacaoPushLojaService,
        private jhiAlertService: JhiAlertService,
        private auxService: AuxiliarService,
        private ref: ChangeDetectorRef
    ) {
        this.lojasSelecionadas = [];
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
        this.activatedRoute.data.subscribe(({ comunicacaoPush }) => {
            this.comunicacaoPush = comunicacaoPush;
            if (this.comunicacaoPush.id !== undefined) {
                this.comunicacaoPushLojaService.findByIdPush(this.comunicacaoPush.id).subscribe(
                    (res: HttpResponse<IComunicacaoPushLoja[]>) => {
                        this.pushLoja = res.body;
                        this.pushLoja.forEach(element => {
                            this.lojasSelecionadas.push(element.lojaMaconicaId);
                        });
                        this.loading = false;
                        this.ref.detectChanges();
                    },
                    (res: HttpErrorResponse) => {
                        this.onError(res.message);
                        this.loading = false;
                        this.ref.detectChanges();
                    }
                );
            } else {
                this.loading = false;
                this.ref.detectChanges();
            }
        });
        this.lojaMaconicaService.findByStatus(true).subscribe(
            (res: HttpResponse<ILojaMaconica[]>) => {
                this.lojas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.comunicacaoPush.id !== undefined) {
            this.loading = true;
            this.subscribeToSaveResponse(this.comunicacaoPushService.update(this.comunicacaoPush));
        } else {
            Swal.fire({
                title: 'Tem Certeza que deseja realizar o envio?',
                text: 'Após o envio, não será possível realizar cancelamento e edições!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Enviar!',
                cancelButtonText: 'Cancelar'
            }).then(result => {
                if (result.value) {
                    this.loading = true;
                    this.subscribeToSaveResponse(this.comunicacaoPushService.create(this.comunicacaoPush));
                }
            });
        }
    }
    selecionarLoja(id: any) {
        if (id === 0) {
            if (this.lojasSelecionadas.length !== this.lojas.length) {
                this.lojasSelecionadas = [];
                this.lojas.forEach(value => {
                    this.lojasSelecionadas.push(value.id);
                });
            } else {
                this.lojasSelecionadas = [];
            }
        } else {
            if (this.lojasSelecionadas === undefined || this.lojasSelecionadas === null) {
                this.lojasSelecionadas = [];
                this.lojasSelecionadas.push(id);
            } else if (this.lojasSelecionadas.indexOf(id) > -1) {
                this.lojasSelecionadas.splice(this.lojasSelecionadas.indexOf(id), 1);
            } else {
                this.lojasSelecionadas.push(id);
            }
        }

        this.itemSelecionado = this.lojasSelecionadas.length > 0 ? this.lojasSelecionadas : null;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IComunicacaoPush>>) {
        result.subscribe(
            (res: HttpResponse<ILojaMaconica>) => {
                const dados = res.body;
                if (this.lojasSelecionadas != null && this.lojasSelecionadas.length > 0) {
                    this.incluirLoja(this.lojasSelecionadas, dados.id).then(values => {
                        let isInclusaoOK = true;
                        values.forEach(element => {
                            if (!isInclusaoOK || element === undefined || !element.ok) isInclusaoOK = false;
                        });
                        if (isInclusaoOK) {
                            this.comunicacaoPushService.send(dados.id).subscribe();
                            this.onSaveSuccess();
                        } else {
                            this.comunicacaoPushService.delete(dados.id).subscribe();
                            this.onSaveError();
                            this.onError('Não foi possível incluir as lojas selecionadas.');
                        }
                    });
                }
            },
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
    async deletarComunicacao(id: any) {
        const result = await this.comunicacaoPushLojaService.delete(id).toPromise();
    }
    async incluirLoja(lojas: any[], id: any) {
        let retorno = [];
        for (var i = 0; lojas.length > i; i++) {
            let comunicacao = new ComunicacaoPushLoja();
            comunicacao.comunicacaoPushId = id;
            comunicacao.lojaMaconicaId = lojas[i];
            retorno.push(this.comunicacaoPushLojaService.create(comunicacao).toPromise());
        }

        return await Promise.all(retorno);
        //return isInclusaoOK;
    }
    private onSaveSuccess() {
        this.isSaving = false;
        this.loading = false;
        this.previousState();
    }

    private onSaveError() {
        this.loading = false;
        this.isSaving = false;
    }
    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
    trackById(index: number, item: any) {
        return item.id;
    }
}
