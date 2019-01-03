import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ILojaMaconica } from 'app/shared/model/loja-maconica.model';
import { LojaMaconicaService } from './loja-maconica.service';
import { IContatoLojaMaconica } from 'app/shared/model/contato-loja-maconica.model';
import { ContatoLojaMaconicaService } from 'app/entities/contato-loja-maconica';
import { IComunicacaoPush } from 'app/shared/model/comunicacao-push.model';
import { ComunicacaoPushService } from 'app/entities/comunicacao-push';

@Component({
    selector: 'jhi-loja-maconica-update',
    templateUrl: './loja-maconica-update.component.html'
})
export class LojaMaconicaUpdateComponent implements OnInit {
    lojaMaconica: ILojaMaconica;
    isSaving: boolean;

    contatoes: IContatoLojaMaconica[];

    comunicacaopushes: IComunicacaoPush[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private lojaMaconicaService: LojaMaconicaService,
        private contatoLojaMaconicaService: ContatoLojaMaconicaService,
        private comunicacaoPushService: ComunicacaoPushService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ lojaMaconica }) => {
            this.lojaMaconica = lojaMaconica;
        });
        this.contatoLojaMaconicaService.query({ filter: 'lojamaconica-is-null' }).subscribe(
            (res: HttpResponse<IContatoLojaMaconica[]>) => {
                if (!this.lojaMaconica.contato || !this.lojaMaconica.contato.id) {
                    this.contatoes = res.body;
                } else {
                    this.contatoLojaMaconicaService.find(this.lojaMaconica.contato.id).subscribe(
                        (subRes: HttpResponse<IContatoLojaMaconica>) => {
                            this.contatoes = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.comunicacaoPushService.query().subscribe(
            (res: HttpResponse<IComunicacaoPush[]>) => {
                this.comunicacaopushes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.lojaMaconica.id !== undefined) {
            this.subscribeToSaveResponse(this.lojaMaconicaService.update(this.lojaMaconica));
        } else {
            this.subscribeToSaveResponse(this.lojaMaconicaService.create(this.lojaMaconica));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILojaMaconica>>) {
        result.subscribe((res: HttpResponse<ILojaMaconica>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackContatoLojaMaconicaById(index: number, item: IContatoLojaMaconica) {
        return item.id;
    }

    trackComunicacaoPushById(index: number, item: IComunicacaoPush) {
        return item.id;
    }
}
