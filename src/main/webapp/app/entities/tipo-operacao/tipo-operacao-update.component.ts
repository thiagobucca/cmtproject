import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITipoOperacao } from 'app/shared/model/tipo-operacao.model';
import { TipoOperacaoService } from './tipo-operacao.service';

@Component({
    selector: 'jhi-tipo-operacao-update',
    templateUrl: './tipo-operacao-update.component.html'
})
export class TipoOperacaoUpdateComponent implements OnInit {
    tipoOperacao: ITipoOperacao;
    isSaving: boolean;

    constructor(private tipoOperacaoService: TipoOperacaoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tipoOperacao }) => {
            this.tipoOperacao = tipoOperacao;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tipoOperacao.id !== undefined) {
            this.subscribeToSaveResponse(this.tipoOperacaoService.update(this.tipoOperacao));
        } else {
            this.subscribeToSaveResponse(this.tipoOperacaoService.create(this.tipoOperacao));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITipoOperacao>>) {
        result.subscribe((res: HttpResponse<ITipoOperacao>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
