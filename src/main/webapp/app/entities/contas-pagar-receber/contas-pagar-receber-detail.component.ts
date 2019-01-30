import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContasPagarReceber } from 'app/shared/model/contas-pagar-receber.model';

@Component({
    selector: 'jhi-contas-pagar-receber-detail',
    templateUrl: './contas-pagar-receber-detail.component.html'
})
export class ContasPagarReceberDetailComponent implements OnInit {
    contasPagarReceber: IContasPagarReceber;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ contasPagarReceber }) => {
            this.contasPagarReceber = contasPagarReceber;
        });
    }

    previousState() {
        window.history.back();
    }
}
