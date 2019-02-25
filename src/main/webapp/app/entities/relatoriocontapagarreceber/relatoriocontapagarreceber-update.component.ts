import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IRelatoriocontapagarreceber } from 'app/shared/model/relatoriocontapagarreceber.model';
import { RelatoriocontapagarreceberService } from './relatoriocontapagarreceber.service';

@Component({
    selector: 'jhi-relatoriocontapagarreceber-update',
    templateUrl: './relatoriocontapagarreceber-update.component.html'
})
export class RelatoriocontapagarreceberUpdateComponent implements OnInit {
    relatoriocontapagarreceber: IRelatoriocontapagarreceber;
    isSaving: boolean;

    constructor(private relatoriocontapagarreceberService: RelatoriocontapagarreceberService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ relatoriocontapagarreceber }) => {
            this.relatoriocontapagarreceber = relatoriocontapagarreceber;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.relatoriocontapagarreceber.id !== undefined) {
            this.subscribeToSaveResponse(this.relatoriocontapagarreceberService.update(this.relatoriocontapagarreceber));
        } else {
            this.subscribeToSaveResponse(this.relatoriocontapagarreceberService.create(this.relatoriocontapagarreceber));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRelatoriocontapagarreceber>>) {
        result.subscribe(
            (res: HttpResponse<IRelatoriocontapagarreceber>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
