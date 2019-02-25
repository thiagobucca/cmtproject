import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IRelatoriocupomxcmt } from 'app/shared/model/relatoriocupomxcmt.model';
import { RelatoriocupomxcmtService } from './relatoriocupomxcmt.service';

@Component({
    selector: 'jhi-relatoriocupomxcmt-update',
    templateUrl: './relatoriocupomxcmt-update.component.html'
})
export class RelatoriocupomxcmtUpdateComponent implements OnInit {
    relatoriocupomxcmt: IRelatoriocupomxcmt;
    isSaving: boolean;

    constructor(private relatoriocupomxcmtService: RelatoriocupomxcmtService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ relatoriocupomxcmt }) => {
            this.relatoriocupomxcmt = relatoriocupomxcmt;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.relatoriocupomxcmt.id !== undefined) {
            this.subscribeToSaveResponse(this.relatoriocupomxcmtService.update(this.relatoriocupomxcmt));
        } else {
            this.subscribeToSaveResponse(this.relatoriocupomxcmtService.create(this.relatoriocupomxcmt));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRelatoriocupomxcmt>>) {
        result.subscribe((res: HttpResponse<IRelatoriocupomxcmt>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
