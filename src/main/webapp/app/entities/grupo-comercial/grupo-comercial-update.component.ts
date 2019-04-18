import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGrupoComercial } from 'app/shared/model/grupo-comercial.model';
import { GrupoComercialService } from './grupo-comercial.service';

@Component({
    selector: 'jhi-grupo-comercial-update',
    templateUrl: './grupo-comercial-update.component.html'
})
export class GrupoComercialUpdateComponent implements OnInit {
    grupoComercial: IGrupoComercial;
    isSaving: boolean;

    constructor(private grupoComercialService: GrupoComercialService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ grupoComercial }) => {
            this.grupoComercial = grupoComercial;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
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
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
