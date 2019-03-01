import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRelatorioCupomCmt } from 'app/shared/model/relatorio-cupom-cmt.model';

import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'jhi-relatorio-cupom-cmt-detail',
    templateUrl: './relatorio-cupom-cmt-detail.component.html'
})
export class RelatorioCupomCmtDetailComponent implements OnInit {
    relatorioCupomCmt: IRelatorioCupomCmt;

    constructor(private activatedRoute: ActivatedRoute, private auxService: AuxiliarService, private ref: ChangeDetectorRef) {}

    get loading(): boolean {
        return this.auxService.isLoading;
    }
    set loading(status: boolean) {
        this.auxService.isLoading = status;
    }
    ngOnInit() {
        this.loading = true;
        this.activatedRoute.data.subscribe(({ relatorioCupomCmt }) => {
            this.relatorioCupomCmt = relatorioCupomCmt;
            this.loading = false;
            this.ref.detectChanges();
        });
    }

    previousState() {
        this.loading = true;
        window.history.back();
    }
}
