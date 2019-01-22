import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IComunicacaoPushLoja } from 'app/shared/model/comunicacao-push-loja.model';
import { ComunicacaoPushLojaService } from './comunicacao-push-loja.service';

@Component({
    selector: 'jhi-comunicacao-push-loja-update',
    templateUrl: './comunicacao-push-loja-update.component.html'
})
export class ComunicacaoPushLojaUpdateComponent implements OnInit {
    comunicacaoPushLoja: IComunicacaoPushLoja;
    isSaving: boolean;

    constructor(private comunicacaoPushLojaService: ComunicacaoPushLojaService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ comunicacaoPushLoja }) => {
            this.comunicacaoPushLoja = comunicacaoPushLoja;
        });
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
}
