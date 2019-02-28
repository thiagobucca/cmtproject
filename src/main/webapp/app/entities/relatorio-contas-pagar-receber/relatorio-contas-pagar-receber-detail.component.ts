import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRelatorioContasPagarReceber } from 'app/shared/model/relatorio-contas-pagar-receber.model';

@Component({
    selector: 'jhi-relatorio-contas-pagar-receber-detail',
    templateUrl: './relatorio-contas-pagar-receber-detail.component.html'
})
export class RelatorioContasPagarReceberDetailComponent implements OnInit {
    relatorioContasPagarReceber: IRelatorioContasPagarReceber;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ relatorioContasPagarReceber }) => {
            this.relatorioContasPagarReceber = relatorioContasPagarReceber;
        });
    }

    previousState() {
        window.history.back();
    }
}
