import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMembro } from 'app/shared/model/membro.model';
import { MembroService } from './membro.service';

@Component({
    selector: 'jhi-membro-update',
    templateUrl: './membro-update.component.html'
})
export class MembroUpdateComponent implements OnInit {
    membro: IMembro;
    isSaving: boolean;

    constructor(private membroService: MembroService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ membro }) => {
            this.membro = membro;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.membro.id !== undefined) {
            this.subscribeToSaveResponse(this.membroService.update(this.membro));
        } else {
            this.subscribeToSaveResponse(this.membroService.create(this.membro));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMembro>>) {
        result.subscribe((res: HttpResponse<IMembro>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
