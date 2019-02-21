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

@Component({
    selector: 'jhi-cupom-update',
    templateUrl: './cupom-update.component.html'
})
export class CupomUpdateComponent implements OnInit {
    cupom: ICupom;
    isSaving: boolean;

    estabelecimentos: IEstabelecimentoComercial[];
    data: string;
    hora: string;
    constructor(
        private dataUtils: JhiDataUtils,
        private cupomService: CupomService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute,
        private estabelecimentoComercialService: EstabelecimentoComercialService,
        private jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cupom }) => {
            this.cupom = cupom;
            this.data = this.cupom.data != null ? this.cupom.data.format(DATE_FORMAT) : null;
            this.hora = this.cupom.data != null ? this.cupom.data.format(TIME_FORMAT) : null;
        });

        this.estabelecimentoComercialService.findByStatus(true).subscribe(
            (res: HttpResponse<IEstabelecimentoComercial[]>) => {
                this.estabelecimentos = res.body;
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
        this.dataUtils.clearInputImage(this.cupom, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.cupom.data = this.data != null && this.hora != null ? moment(this.data + 'T' + this.hora, DATE_TIME_FORMAT) : null;
        this.cupom.estabelecimento = null;
        if (this.cupom.id !== undefined) {
            this.subscribeToSaveResponse(this.cupomService.update(this.cupom));
        } else {
            this.subscribeToSaveResponse(this.cupomService.create(this.cupom));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICupom>>) {
        result.subscribe((res: HttpResponse<ICupom>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
