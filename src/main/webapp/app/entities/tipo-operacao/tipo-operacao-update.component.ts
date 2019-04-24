import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITipoOperacao } from 'app/shared/model/tipo-operacao.model';
import { TipoOperacaoService } from './tipo-operacao.service';

import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-tipo-operacao-update',
    templateUrl: './tipo-operacao-update.component.html'
})
export class TipoOperacaoUpdateComponent implements OnInit {
    tipoOperacao: ITipoOperacao;
    isSaving: boolean;

    constructor(
        private tipoOperacaoService: TipoOperacaoService,
        private activatedRoute: ActivatedRoute,
        private auxService: AuxiliarService,
        private jhiAlertService: JhiAlertService,
        private ref: ChangeDetectorRef
    ) {}
    get loading(): boolean {
        return this.auxService.isLoading;
    }
    set loading(status: boolean) {
        this.auxService.isLoading = status;
    }
    ngOnInit() {
        this.loading = true;
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tipoOperacao }) => {
            this.tipoOperacao = tipoOperacao;
            this.loading = false;
            this.ref.detectChanges();
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.loading = true;
        this.isSaving = true;
        if (this.tipoOperacao.id !== undefined) {
            this.subscribeToSaveResponse(this.tipoOperacaoService.update(this.tipoOperacao));
        } else {
            this.subscribeToSaveResponse(this.tipoOperacaoService.create(this.tipoOperacao));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITipoOperacao>>) {
        result.subscribe(
            (res: HttpResponse<ITipoOperacao>) => this.onSaveSuccess(),
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
    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
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
}
