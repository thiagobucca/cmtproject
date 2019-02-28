import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { IUsuarioportal } from 'app/shared/model/usuarioportal.model';
import { UsuarioportalService } from './usuarioportal.service';

@Component({
    selector: 'jhi-usuarioportal-update',
    templateUrl: './usuarioportal-update.component.html'
})
export class UsuarioportalUpdateComponent implements OnInit {
    usuarioportal: IUsuarioportal;
    isSaving: boolean;
    createdDateDp: any;
    lastModifiedDateDp: any;
    dataNascimentoDp: any;

    constructor(private usuarioportalService: UsuarioportalService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ usuarioportal }) => {
            this.usuarioportal = usuarioportal;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.usuarioportal.id !== undefined) {
            this.subscribeToSaveResponse(this.usuarioportalService.update(this.usuarioportal));
        } else {
            this.subscribeToSaveResponse(this.usuarioportalService.create(this.usuarioportal));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IUsuarioportal>>) {
        result.subscribe((res: HttpResponse<IUsuarioportal>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
