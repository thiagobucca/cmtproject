import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRelatorioCupomCmt } from 'app/shared/model/relatorio-cupom-cmt.model';

@Component({
    selector: 'jhi-relatorio-cupom-cmt-detail',
    templateUrl: './relatorio-cupom-cmt-detail.component.html'
})
export class RelatorioCupomCmtDetailComponent implements OnInit {
    relatorioCupomCmt: IRelatorioCupomCmt;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ relatorioCupomCmt }) => {
            this.relatorioCupomCmt = relatorioCupomCmt;
        });
    }

    previousState() {
        window.history.back();
    }
}
