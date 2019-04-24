import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IParametrizacao } from 'app/shared/model/parametrizacao.model';
import { ParametrizacaoService } from './parametrizacao.service';

import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';

import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-parametrizacao-update',
    templateUrl: './parametrizacao-update.component.html'
})
export class ParametrizacaoUpdateComponent implements OnInit {
    parametrizacao: IParametrizacao;
    isSaving: boolean;
    constructor(
        private parametrizacaoService: ParametrizacaoService,
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
        this.isSaving = true;
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ parametrizacao }) => {
            this.parametrizacao = parametrizacao;
            this.loading = false;
            this.ref.detectChanges();
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.isSaving = true;
        if (this.parametrizacao.id !== undefined) {
            this.subscribeToSaveResponse(this.parametrizacaoService.update(this.parametrizacao));
        } else {
            this.subscribeToSaveResponse(this.parametrizacaoService.create(this.parametrizacao));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IParametrizacao>>) {
        result.subscribe(
            (res: HttpResponse<IParametrizacao>) => this.onSaveSuccess(),
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
