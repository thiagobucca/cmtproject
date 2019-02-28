import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICategoriaEstabelecimento } from 'app/shared/model/categoria-estabelecimento.model';
import { CategoriaEstabelecimentoService } from './categoria-estabelecimento.service';
import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-categoria-estabelecimento-update',
    templateUrl: './categoria-estabelecimento-update.component.html'
})
export class CategoriaEstabelecimentoUpdateComponent implements OnInit {
    categoriaEstabelecimento: ICategoriaEstabelecimento;
    isSaving: boolean;

    constructor(
        private categoriaEstabelecimentoService: CategoriaEstabelecimentoService,
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
        this.isSaving = false;
        this.loading = true;
        this.activatedRoute.data.subscribe(({ categoriaEstabelecimento }) => {
            this.categoriaEstabelecimento = categoriaEstabelecimento;
            this.loading = false;
            this.ref.detectChanges();
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.loading = true;
        if (this.categoriaEstabelecimento.id !== undefined) {
            this.subscribeToSaveResponse(this.categoriaEstabelecimentoService.update(this.categoriaEstabelecimento));
        } else {
            this.subscribeToSaveResponse(this.categoriaEstabelecimentoService.create(this.categoriaEstabelecimento));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICategoriaEstabelecimento>>) {
        result.subscribe(
            (res: HttpResponse<ICategoriaEstabelecimento>) => this.onSaveSuccess(),
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
