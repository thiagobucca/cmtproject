import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { IEstabelecimentoComercial } from 'app/shared/model/estabelecimento-comercial.model';
import { EstabelecimentoComercialService } from './estabelecimento-comercial.service';

import { IContatoEstabelecimento, ContatoEstabelecimento } from 'app/shared/model/contato-estabelecimento.model';
import { ContatoEstabelecimentoService } from 'app/entities/contato-estabelecimento/contato-estabelecimento.service';

import { JhiAlertService } from 'ng-jhipster';

import { ICategoriaEstabelecimento } from 'app/shared/model/categoria-estabelecimento.model';
import { CategoriaEstabelecimentoService } from 'app/entities/categoria-estabelecimento';
import { debug } from 'util';

@Component({
    selector: 'jhi-estabelecimento-comercial-update',
    templateUrl: './estabelecimento-comercial-update.component.html'
})
export class EstabelecimentoComercialUpdateComponent implements OnInit {
    contatoEstabelecimento: IContatoEstabelecimento;
    estabelecimentoComercial: IEstabelecimentoComercial;
    estabelecimentos: IEstabelecimentoComercial[];
    isSaving: boolean;
    categorias: ICategoriaEstabelecimento[];
    indexEdit: number;
    contatoEstabelecimentos: IContatoEstabelecimento[];
    contatoEstabelecimentosDel: IContatoEstabelecimento[];
    constructor(
        private dataUtils: JhiDataUtils,
        private estabelecimentoComercialService: EstabelecimentoComercialService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute,
        private jhiAlertService: JhiAlertService,
        private categoriaEstabelecimentoService: CategoriaEstabelecimentoService,
        private contatoEstabelecimentoService: ContatoEstabelecimentoService
    ) {
        this.indexEdit = -1;
    }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ estabelecimentoComercial }) => {
            this.estabelecimentoComercial = estabelecimentoComercial;
            this.contatoEstabelecimento = new ContatoEstabelecimento();
            if (this.estabelecimentoComercial.id !== undefined) {
                this.contatoEstabelecimentoService.findByEstabelecimento(this.estabelecimentoComercial.id).subscribe(
                    (res: HttpResponse<IEstabelecimentoComercial[]>) => {
                        this.contatoEstabelecimentos = res.body;
                    },
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            }
        });

        this.estabelecimentoComercialService.findByStatus(true).subscribe(
            (res: HttpResponse<IEstabelecimentoComercial[]>) => {
                this.estabelecimentos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.categoriaEstabelecimentoService.query({ filter: 'categoriaEstabelecimento-is-null' }).subscribe(
            (res: HttpResponse<ICategoriaEstabelecimento[]>) => {
                this.categorias = res.body;
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

    saveItem() {
        if (this.contatoEstabelecimentos === null) {
            this.contatoEstabelecimentos = [];
        }

        if (this.indexEdit > -1) {
            this.contatoEstabelecimentos[this.indexEdit] = this.contatoEstabelecimento;
        } else {
            this.contatoEstabelecimentos.push(this.contatoEstabelecimento);
        }

        this.contatoEstabelecimento = new ContatoEstabelecimento();
        this.indexEdit = -1;
    }
    editarItem(idx: number) {
        this.contatoEstabelecimento = JSON.parse(JSON.stringify(this.contatoEstabelecimentos[idx]));
        this.indexEdit = idx;
    }

    deletar(idx: number) {
        if (this.contatoEstabelecimentosDel === null) {
            this.contatoEstabelecimentosDel = [];
        }

        if (this.contatoEstabelecimentos[idx].id === undefined) {
            this.contatoEstabelecimentos.splice(idx, 1);
        } else {
            this.contatoEstabelecimentosDel.push(this.contatoEstabelecimentos[idx]);
            this.contatoEstabelecimentos.splice(idx, 1);
        }
    }
    cancelar() {
        this.contatoEstabelecimento = new ContatoEstabelecimento();
        this.indexEdit = -1;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEstabelecimentoComercial>>) {
        result.subscribe(
            (res: HttpResponse<IEstabelecimentoComercial>) => {
                const dados = res.body;
                if (this.contatoEstabelecimentos != null && this.contatoEstabelecimentos.length > 0) {
                    this.contatoEstabelecimentos.forEach(element => {
                        element.estabelecimentoComercialId = dados.id;
                        if (element.id !== undefined) {
                            this.contatoEstabelecimentoService.update(element);
                        } else {
                            this.contatoEstabelecimentoService.create(element);
                        }
                    });
                }
                if (this.contatoEstabelecimentosDel != null && this.contatoEstabelecimentosDel.length > 0) {
                    this.contatoEstabelecimentosDel.forEach(element => {
                        if (element.id !== undefined) {
                            this.contatoEstabelecimentoService.delete(element.id);
                        }
                    });
                }
                this.onSaveSuccess();
            },
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
    trackById(index: number, item: any) {
        return item.id;
    }
}
