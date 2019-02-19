import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IComunicacaoPush } from 'app/shared/model/comunicacao-push.model';
import { ComunicacaoPushService } from './comunicacao-push.service';
import { IComunicacaoPushLoja, ComunicacaoPushLoja } from 'app/shared/model/comunicacao-push-loja.model';
import { ComunicacaoPushLojaService } from 'app/entities/comunicacao-push-loja';
import { JhiAlertService } from 'ng-jhipster';
import { ILojaMaconica } from 'app/shared/model/loja-maconica.model';
import { LojaMaconicaService } from 'app/entities/loja-maconica';

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
    constructor(
        private comunicacaoPushService: ComunicacaoPushService,
        private activatedRoute: ActivatedRoute,
        private lojaMaconicaService: LojaMaconicaService,
        private comunicacaoPushLojaService: ComunicacaoPushLojaService,
        private jhiAlertService: JhiAlertService
    ) {
        this.lojasSelecionadas = [];
    }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ comunicacaoPush }) => {
            this.comunicacaoPush = comunicacaoPush;
            if (this.comunicacaoPush.id !== undefined) {
                this.comunicacaoPushLojaService.findByIdPush(this.comunicacaoPush.id).subscribe(
                    (res: HttpResponse<IComunicacaoPushLoja[]>) => {
                        this.pushLoja = res.body;
                        this.pushLoja.forEach(element => {
                            this.lojasSelecionadas.push(element.lojaMaconicaId);
                        });
                    },
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
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
            this.subscribeToSaveResponse(this.comunicacaoPushService.update(this.comunicacaoPush));
        } else {
            this.subscribeToSaveResponse(this.comunicacaoPushService.create(this.comunicacaoPush));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IComunicacaoPush>>) {
        result.subscribe(
            (res: HttpResponse<ILojaMaconica>) => {
                const dados = res.body;
                if (this.lojasSelecionadas != null && this.lojasSelecionadas.length > 0) {
                    if (this.pushLoja != null && this.pushLoja.length > 0) {
                        this.pushLoja.forEach(element => {
                            if (element.id !== undefined) {
                                this.comunicacaoPushService.delete(element.id);
                            }
                        });
                    }
                    this.lojasSelecionadas.forEach(element => {
                        const comunicacao = new ComunicacaoPushLoja();
                        comunicacao.comunicacaoPushId = dados.id;
                        comunicacao.lojaMaconicaId = element;
                        this.comunicacaoPushService.create(comunicacao);
                    });
                }
                this.onSaveSuccess();
            },
            (res: HttpErrorResponse) => this.onSaveError()
        );
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
