import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ILojaMaconica } from 'app/shared/model/loja-maconica.model';
import { LojaMaconicaService } from './loja-maconica.service';

@Component({
    selector: 'jhi-loja-maconica-update',
    templateUrl: './loja-maconica-update.component.html'
})
export class LojaMaconicaUpdateComponent implements OnInit {
    lojaMaconica: ILojaMaconica;
    isSaving: boolean;

    constructor(private lojaMaconicaService: LojaMaconicaService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ lojaMaconica }) => {
            this.lojaMaconica = lojaMaconica;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.lojaMaconica.id !== undefined) {
            this.subscribeToSaveResponse(this.lojaMaconicaService.update(this.lojaMaconica));
        } else {
            this.subscribeToSaveResponse(this.lojaMaconicaService.create(this.lojaMaconica));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILojaMaconica>>) {
        result.subscribe((res: HttpResponse<ILojaMaconica>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
