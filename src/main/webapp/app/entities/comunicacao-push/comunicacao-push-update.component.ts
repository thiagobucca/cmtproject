import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IComunicacaoPush } from 'app/shared/model/comunicacao-push.model';
import { ComunicacaoPushService } from './comunicacao-push.service';

@Component({
    selector: 'jhi-comunicacao-push-update',
    templateUrl: './comunicacao-push-update.component.html'
})
export class ComunicacaoPushUpdateComponent implements OnInit {
    comunicacaoPush: IComunicacaoPush;
    isSaving: boolean;

    constructor(private comunicacaoPushService: ComunicacaoPushService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ comunicacaoPush }) => {
            this.comunicacaoPush = comunicacaoPush;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.comunicacaoPush.id !== undefined) {
            this.subscribeToSaveResponse(this.comunicacaoPushService.update(this.comunicacaoPush));
        } else {
            this.subscribeToSaveResponse(this.comunicacaoPushService.create(this.comunicacaoPush));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IComunicacaoPush>>) {
        result.subscribe((res: HttpResponse<IComunicacaoPush>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
