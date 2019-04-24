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

import { IGrupoComercial } from 'app/shared/model/grupo-comercial.model';
import { GrupoComercialService } from 'app/entities/grupo-comercial/grupo-comercial.service';

import { GenericValidator } from 'app/shared/util/validacoes';

import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'jhi-estabelecimento-comercial-update',
    templateUrl: './estabelecimento-comercial-update.component.html'
})
export class EstabelecimentoComercialUpdateComponent implements OnInit {
    isBase64: boolean;
    contatoEstabelecimento: IContatoEstabelecimento;
    estabelecimentoComercial: IEstabelecimentoComercial;
    estabelecimentos: IEstabelecimentoComercial[];
    grupos: IGrupoComercial[];
    isSaving: boolean;
    categorias: ICategoriaEstabelecimento[];
    indexEdit: number;
    contatoEstabelecimentos: IContatoEstabelecimento[];
    contatoEstabelecimentosDel: IContatoEstabelecimento[];
    validacoes: GenericValidator;
    constructor(
        private dataUtils: JhiDataUtils,
        private estabelecimentoComercialService: EstabelecimentoComercialService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute,
        private jhiAlertService: JhiAlertService,
        private categoriaEstabelecimentoService: CategoriaEstabelecimentoService,
        private contatoEstabelecimentoService: ContatoEstabelecimentoService,
        private auxService: AuxiliarService,
        private ref: ChangeDetectorRef,
        private grupoComercialService: GrupoComercialService
    ) {
        this.isBase64 = true;
        this.indexEdit = -1;
        this.validacoes = new GenericValidator();
    }
    get loading(): boolean {
        return this.auxService.isLoading;
    }
    set loading(status: boolean) {
        this.auxService.isLoading = status;
    }
    ngOnInit() {
        this.loading = true;
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ estabelecimentoComercial }) => {
            this.estabelecimentoComercial = estabelecimentoComercial;
            this.contatoEstabelecimento = new ContatoEstabelecimento();
            this.loading = false;
            this.ref.detectChanges();
            if (this.estabelecimentoComercial.logo !== undefined) {
                this.isBase64 = false;
            }
            if (this.estabelecimentoComercial.id !== undefined) {
                this.loading = true;
                this.contatoEstabelecimentoService.findByEstabelecimento(this.estabelecimentoComercial.id).subscribe(
                    (res: HttpResponse<IEstabelecimentoComercial[]>) => {
                        this.contatoEstabelecimentos = res.body;
                        this.loading = false;
                        this.ref.detectChanges();
                    },
                    (res: HttpErrorResponse) => {
                        this.onError(res.message);
                        this.loading = false;
                        this.ref.detectChanges();
                    }
                );
            }
        });

        this.estabelecimentoComercialService.findByStatus(true, { size: 1000, sort: ['nome,asc'] }).subscribe(
            (res: HttpResponse<IEstabelecimentoComercial[]>) => {
                this.estabelecimentos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.categoriaEstabelecimentoService.query({ bolAtivo: true, size: 1000, sort: ['nome,asc'] }).subscribe(
            (res: HttpResponse<ICategoriaEstabelecimento[]>) => {
                this.categorias = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.grupoComercialService.query({ bolAtivo: true, size: 1000, sort: ['nome,asc'] }).subscribe(
            (res: HttpResponse<IGrupoComercial[]>) => {
                this.grupos = res.body;
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
        this.loading = true;
        if (this.validar()) {
            this.estabelecimentoComercial.categoria = null;
            if (this.estabelecimentoComercial.id !== undefined) {
                this.estabelecimentoComercial.matriz = null;

                this.subscribeToSaveResponse(this.estabelecimentoComercialService.update(this.estabelecimentoComercial));
            } else {
                this.subscribeToSaveResponse(this.estabelecimentoComercialService.create(this.estabelecimentoComercial));
            }
        } else {
            this.isSaving = false;
        }
    }

    validar(): boolean {
        let isValido = true;
        if (!this.validacoes.isValidCnpj(this.estabelecimentoComercial.codCnpj)) {
            this.onError('Informe um CNPJ válido');
            isValido = false;
        }
        if (this.estabelecimentoComercial.taxaConvenio === undefined || this.estabelecimentoComercial.taxaConvenio <= 0) {
            this.onError('A taxa do convênio deve ser maior que zero');
            isValido = false;
        }
        return isValido;
    }
    saveItem() {
        if (this.contatoEstabelecimentos === undefined) {
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
        if (this.contatoEstabelecimentosDel === undefined) {
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
                            this.contatoEstabelecimentoService.update(element).subscribe();
                        } else {
                            this.contatoEstabelecimentoService.create(element).subscribe();
                        }
                    });
                }
                if (this.contatoEstabelecimentosDel != null && this.contatoEstabelecimentosDel.length > 0) {
                    this.contatoEstabelecimentosDel.forEach(element => {
                        if (element.id !== undefined) {
                            this.contatoEstabelecimentoService.delete(element.id).subscribe();
                        }
                    });
                }
                this.onSaveSuccess();
            },
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

    private onSaveSuccess() {
        this.isSaving = false;
        this.loading = false;
        this.previousState();
    }

    private onSaveError() {
        this.loading = false;
        this.isSaving = false;
    }
    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
    trackById(index: number, item: any) {
        return item.id;
    }
}
