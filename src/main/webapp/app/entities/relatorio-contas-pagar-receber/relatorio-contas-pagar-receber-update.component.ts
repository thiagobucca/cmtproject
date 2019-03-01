import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IRelatorioContasPagarReceber } from 'app/shared/model/relatorio-contas-pagar-receber.model';
import { RelatorioContasPagarReceberService } from './relatorio-contas-pagar-receber.service';

@Component({
    selector: 'jhi-relatorio-contas-pagar-receber-update',
    templateUrl: './relatorio-contas-pagar-receber-update.component.html'
})
export class RelatorioContasPagarReceberUpdateComponent implements OnInit {
    relatorioContasPagarReceber: IRelatorioContasPagarReceber;
    isSaving: boolean;

    constructor(private relatorioContasPagarReceberService: RelatorioContasPagarReceberService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ relatorioContasPagarReceber }) => {
            this.relatorioContasPagarReceber = relatorioContasPagarReceber;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.relatorioContasPagarReceber.id !== undefined) {
            this.subscribeToSaveResponse(this.relatorioContasPagarReceberService.update(this.relatorioContasPagarReceber));
        } else {
            this.subscribeToSaveResponse(this.relatorioContasPagarReceberService.create(this.relatorioContasPagarReceber));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRelatorioContasPagarReceber>>) {
        result.subscribe(
            (res: HttpResponse<IRelatorioContasPagarReceber>) => this.onSaveSuccess(),
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
