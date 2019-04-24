import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRelatorioContasPagarReceber } from 'app/shared/model/relatorio-contas-pagar-receber.model';

import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
    selector: 'jhi-relatorio-contas-pagar-receber-detail',
    templateUrl: './relatorio-contas-pagar-receber-detail.component.html'
})
export class RelatorioContasPagarReceberDetailComponent implements OnInit {
    relatorioContasPagarReceber: IRelatorioContasPagarReceber;

    constructor(private activatedRoute: ActivatedRoute, private auxService: AuxiliarService, private ref: ChangeDetectorRef) {}
    get loading(): boolean {
        return this.auxService.isLoading;
    }
    set loading(status: boolean) {
        this.auxService.isLoading = status;
    }
    ngOnInit() {
        this.loading = true;
        this.activatedRoute.data.subscribe(({ relatorioContasPagarReceber }) => {
            this.relatorioContasPagarReceber = relatorioContasPagarReceber;
            this.loading = false;
            this.ref.detectChanges();
        });
    }

    previousState() {
        window.history.back();
    }
}
