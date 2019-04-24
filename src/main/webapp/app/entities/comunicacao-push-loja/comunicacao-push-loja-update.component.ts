import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IComunicacaoPushLoja } from 'app/shared/model/comunicacao-push-loja.model';
import { ComunicacaoPushLojaService } from './comunicacao-push-loja.service';
import { JhiAlertService } from 'ng-jhipster';
import { ILojaMaconica } from 'app/shared/model/loja-maconica.model';
import { LojaMaconicaService } from 'app/entities/loja-maconica';

import { IComunicacaoPush } from 'app/shared/model/comunicacao-push.model';
import { ComunicacaoPushService } from 'app/entities/comunicacao-push';

@Component({
    selector: 'jhi-comunicacao-push-loja-update',
    templateUrl: './comunicacao-push-loja-update.component.html'
})
export class ComunicacaoPushLojaUpdateComponent implements OnInit {
    comunicacaoPushLoja: IComunicacaoPushLoja;
    isSaving: boolean;
    lojas: ILojaMaconica[];
    comunicacoes: IComunicacaoPush[];
    constructor(
        private comunicacaoPushLojaService: ComunicacaoPushLojaService,
        private activatedRoute: ActivatedRoute,
        private lojaMaconicaService: LojaMaconicaService,
        private comunicacaoPushService: ComunicacaoPushService,
        private jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ comunicacaoPushLoja }) => {
            this.comunicacaoPushLoja = comunicacaoPushLoja;
        });
        this.lojaMaconicaService.findByStatus(true, { size: 1000, sort: ['nome,asc'] }).subscribe(
            (res: HttpResponse<ILojaMaconica[]>) => {
                this.lojas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.comunicacaoPushService.query({ filter: 'comunicacaoPush-is-null' }).subscribe(
            (res: HttpResponse<IComunicacaoPush[]>) => {
                this.comunicacoes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.comunicacaoPushLoja.id !== undefined) {
            this.subscribeToSaveResponse(this.comunicacaoPushLojaService.update(this.comunicacaoPushLoja));
        } else {
            this.subscribeToSaveResponse(this.comunicacaoPushLojaService.create(this.comunicacaoPushLoja));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IComunicacaoPushLoja>>) {
        result.subscribe((res: HttpResponse<IComunicacaoPushLoja>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
