import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IContasPagarReceber } from 'app/shared/model/contas-pagar-receber.model';
import { ContasPagarReceberService } from './contas-pagar-receber.service';

@Component({
    selector: 'jhi-contas-pagar-receber-update',
    templateUrl: './contas-pagar-receber-update.component.html'
})
export class ContasPagarReceberUpdateComponent implements OnInit {
    contasPagarReceber: IContasPagarReceber;
    isSaving: boolean;
    data: string;

    constructor(private contasPagarReceberService: ContasPagarReceberService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ contasPagarReceber }) => {
            this.contasPagarReceber = contasPagarReceber;
            this.data = this.contasPagarReceber.data != null ? this.contasPagarReceber.data.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.contasPagarReceber.data = this.data != null ? moment(this.data, DATE_TIME_FORMAT) : null;
        if (this.contasPagarReceber.id !== undefined) {
            this.subscribeToSaveResponse(this.contasPagarReceberService.update(this.contasPagarReceber));
        } else {
            this.subscribeToSaveResponse(this.contasPagarReceberService.create(this.contasPagarReceber));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IContasPagarReceber>>) {
        result.subscribe((res: HttpResponse<IContasPagarReceber>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
