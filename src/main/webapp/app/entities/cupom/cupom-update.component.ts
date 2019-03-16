import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT, DATE_FORMAT, TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils } from 'ng-jhipster';

import { JhiAlertService } from 'ng-jhipster';

import { ICupom } from 'app/shared/model/cupom.model';
import { CupomService } from './cupom.service';

import { IEstabelecimentoComercial } from 'app/shared/model/estabelecimento-comercial.model';
import { EstabelecimentoComercialService } from 'app/entities/estabelecimento-comercial';

import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'jhi-cupom-update',
    templateUrl: './cupom-update.component.html'
})
export class CupomUpdateComponent implements OnInit {
    cupom: ICupom;
    isSaving: boolean;
    isBase64: boolean;
    estabelecimentos: IEstabelecimentoComercial[];
    data: string;
    hora: string;
    constructor(
        private dataUtils: JhiDataUtils,
        private cupomService: CupomService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute,
        private estabelecimentoComercialService: EstabelecimentoComercialService,
        private jhiAlertService: JhiAlertService,
        private auxService: AuxiliarService,
        private ref: ChangeDetectorRef
    ) {
        this.isBase64 = true;
    }

    ngOnInit() {
        this.loading = true;
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cupom }) => {
            this.cupom = cupom;
            if (this.cupom.foto !== undefined) {
                this.isBase64 = false;
            }
            this.data = this.cupom.data != null ? this.cupom.data.format(DATE_FORMAT) : null;
            this.hora = this.cupom.data != null ? this.cupom.data.format(TIME_FORMAT) : null;
        });

        this.estabelecimentoComercialService.findByStatus(true, { size: 1000, sort: ['nome,asc'] }).subscribe(
            (res: HttpResponse<IEstabelecimentoComercial[]>) => {
                this.estabelecimentos = res.body;
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
    get loading(): boolean {
        return this.auxService.isLoading;
    }
    set loading(status: boolean) {
        this.auxService.isLoading = status;
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
        this.isBase64 = true;
        this.dataUtils.clearInputImage(this.cupom, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.loading = true;
        this.cupom.data = this.data != null && this.hora != null ? moment(this.data + 'T' + this.hora, DATE_TIME_FORMAT) : null;
        this.cupom.estabelecimento = null;
        this.cupom.usuario = null;
        if (this.cupom.id !== undefined) {
            this.subscribeToSaveResponse(this.cupomService.update(this.cupom));
        } else {
            this.subscribeToSaveResponse(this.cupomService.create(this.cupom));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICupom>>) {
        result.subscribe(
            (res: HttpResponse<ICupom>) => this.onSaveSuccess(),
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
