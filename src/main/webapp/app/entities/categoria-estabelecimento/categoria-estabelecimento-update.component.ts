import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICategoriaEstabelecimento } from 'app/shared/model/categoria-estabelecimento.model';
import { CategoriaEstabelecimentoService } from './categoria-estabelecimento.service';

@Component({
    selector: 'jhi-categoria-estabelecimento-update',
    templateUrl: './categoria-estabelecimento-update.component.html'
})
export class CategoriaEstabelecimentoUpdateComponent implements OnInit {
    categoriaEstabelecimento: ICategoriaEstabelecimento;
    isSaving: boolean;

    constructor(private categoriaEstabelecimentoService: CategoriaEstabelecimentoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ categoriaEstabelecimento }) => {
            this.categoriaEstabelecimento = categoriaEstabelecimento;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.categoriaEstabelecimento.id !== undefined) {
            this.subscribeToSaveResponse(this.categoriaEstabelecimentoService.update(this.categoriaEstabelecimento));
        } else {
            this.subscribeToSaveResponse(this.categoriaEstabelecimentoService.create(this.categoriaEstabelecimento));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICategoriaEstabelecimento>>) {
        result.subscribe(
            (res: HttpResponse<ICategoriaEstabelecimento>) => this.onSaveSuccess(),
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
}
