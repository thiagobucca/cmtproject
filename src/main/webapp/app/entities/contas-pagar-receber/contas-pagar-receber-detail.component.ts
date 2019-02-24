import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContasPagarReceber } from 'app/shared/model/contas-pagar-receber.model';

import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
    selector: 'jhi-contas-pagar-receber-detail',
    templateUrl: './contas-pagar-receber-detail.component.html'
})
export class ContasPagarReceberDetailComponent implements OnInit {
    contasPagarReceber: IContasPagarReceber;

    constructor(private activatedRoute: ActivatedRoute, private auxService: AuxiliarService, private ref: ChangeDetectorRef) {}
    get loading(): boolean {
        return this.auxService.isLoading;
    }
    set loading(status: boolean) {
        this.auxService.isLoading = status;
    }
    ngOnInit() {
        this.loading = true;
        this.activatedRoute.data.subscribe(({ contasPagarReceber }) => {
            this.contasPagarReceber = contasPagarReceber;
            this.loading = false;
            this.ref.detectChanges();
        });
    }

    previousState() {
        window.history.back();
    }
}
