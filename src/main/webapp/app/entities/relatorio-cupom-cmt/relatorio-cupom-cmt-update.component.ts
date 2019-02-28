import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IRelatorioCupomCmt } from 'app/shared/model/relatorio-cupom-cmt.model';
import { RelatorioCupomCmtService } from './relatorio-cupom-cmt.service';

@Component({
    selector: 'jhi-relatorio-cupom-cmt-update',
    templateUrl: './relatorio-cupom-cmt-update.component.html'
})
export class RelatorioCupomCmtUpdateComponent implements OnInit {
    relatorioCupomCmt: IRelatorioCupomCmt;
    isSaving: boolean;

    constructor(private relatorioCupomCmtService: RelatorioCupomCmtService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ relatorioCupomCmt }) => {
            this.relatorioCupomCmt = relatorioCupomCmt;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.relatorioCupomCmt.id !== undefined) {
            this.subscribeToSaveResponse(this.relatorioCupomCmtService.update(this.relatorioCupomCmt));
        } else {
            this.subscribeToSaveResponse(this.relatorioCupomCmtService.create(this.relatorioCupomCmt));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRelatorioCupomCmt>>) {
        result.subscribe((res: HttpResponse<IRelatorioCupomCmt>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
