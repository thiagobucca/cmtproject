import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IParametrizacao } from 'app/shared/model/parametrizacao.model';
import { ParametrizacaoService } from './parametrizacao.service';

@Component({
    selector: 'jhi-parametrizacao-update',
    templateUrl: './parametrizacao-update.component.html'
})
export class ParametrizacaoUpdateComponent implements OnInit {
    parametrizacao: IParametrizacao;
    isSaving: boolean;

    constructor(private parametrizacaoService: ParametrizacaoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ parametrizacao }) => {
            this.parametrizacao = parametrizacao;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.parametrizacao.id !== undefined) {
            this.subscribeToSaveResponse(this.parametrizacaoService.update(this.parametrizacao));
        } else {
            this.subscribeToSaveResponse(this.parametrizacaoService.create(this.parametrizacao));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IParametrizacao>>) {
        result.subscribe((res: HttpResponse<IParametrizacao>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
