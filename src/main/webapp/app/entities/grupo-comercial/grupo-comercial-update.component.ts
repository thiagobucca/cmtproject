import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGrupoComercial } from 'app/shared/model/grupo-comercial.model';
import { GrupoComercialService } from './grupo-comercial.service';

import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'jhi-grupo-comercial-update',
    templateUrl: './grupo-comercial-update.component.html'
})
export class GrupoComercialUpdateComponent implements OnInit {
    grupoComercial: IGrupoComercial;
    isSaving: boolean;

    constructor(
        private grupoComercialService: GrupoComercialService,
        private auxService: AuxiliarService,
        private ref: ChangeDetectorRef,
        private activatedRoute: ActivatedRoute
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
        this.activatedRoute.data.subscribe(({ grupoComercial }) => {
            this.grupoComercial = grupoComercial;
            this.loading = false;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.loading = true;
        if (this.grupoComercial.id !== undefined) {
            this.subscribeToSaveResponse(this.grupoComercialService.update(this.grupoComercial));
        } else {
            this.subscribeToSaveResponse(this.grupoComercialService.create(this.grupoComercial));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGrupoComercial>>) {
        result.subscribe((res: HttpResponse<IGrupoComercial>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.loading = false;
        this.ref.detectChanges();
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
