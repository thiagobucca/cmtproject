import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IEstabelecimentoComercial } from 'app/shared/model/estabelecimento-comercial.model';
import { EstabelecimentoComercialService } from './estabelecimento-comercial.service';
import { ICategoriaEstabelecimento } from 'app/shared/model/categoria-estabelecimento.model';
import { CategoriaEstabelecimentoService } from 'app/entities/categoria-estabelecimento';

@Component({
    selector: 'jhi-estabelecimento-comercial-update',
    templateUrl: './estabelecimento-comercial-update.component.html'
})
export class EstabelecimentoComercialUpdateComponent implements OnInit {
    estabelecimentoComercial: IEstabelecimentoComercial;
    isSaving: boolean;

    categorias: ICategoriaEstabelecimento[];

    estabelecimentocomercials: IEstabelecimentoComercial[];

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private estabelecimentoComercialService: EstabelecimentoComercialService,
        private categoriaEstabelecimentoService: CategoriaEstabelecimentoService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ estabelecimentoComercial }) => {
            this.estabelecimentoComercial = estabelecimentoComercial;
        });
        this.categoriaEstabelecimentoService.query({ filter: 'estabelecimentocomercial-is-null' }).subscribe(
            (res: HttpResponse<ICategoriaEstabelecimento[]>) => {
                if (!this.estabelecimentoComercial.categoria || !this.estabelecimentoComercial.categoria.id) {
                    this.categorias = res.body;
                } else {
                    this.categoriaEstabelecimentoService.find(this.estabelecimentoComercial.categoria.id).subscribe(
                        (subRes: HttpResponse<ICategoriaEstabelecimento>) => {
                            this.categorias = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.estabelecimentoComercialService.query().subscribe(
            (res: HttpResponse<IEstabelecimentoComercial[]>) => {
                this.estabelecimentocomercials = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.estabelecimentoComercial, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.estabelecimentoComercial.id !== undefined) {
            this.subscribeToSaveResponse(this.estabelecimentoComercialService.update(this.estabelecimentoComercial));
        } else {
            this.subscribeToSaveResponse(this.estabelecimentoComercialService.create(this.estabelecimentoComercial));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEstabelecimentoComercial>>) {
        result.subscribe(
            (res: HttpResponse<IEstabelecimentoComercial>) => this.onSaveSuccess(),
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

    trackCategoriaEstabelecimentoById(index: number, item: ICategoriaEstabelecimento) {
        return item.id;
    }

    trackEstabelecimentoComercialById(index: number, item: IEstabelecimentoComercial) {
        return item.id;
    }
}
