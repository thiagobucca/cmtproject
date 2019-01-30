import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IEstabelecimentoComercial } from 'app/shared/model/estabelecimento-comercial.model';

@Component({
    selector: 'jhi-estabelecimento-comercial-detail',
    templateUrl: './estabelecimento-comercial-detail.component.html'
})
export class EstabelecimentoComercialDetailComponent implements OnInit {
    estabelecimentoComercial: IEstabelecimentoComercial;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ estabelecimentoComercial }) => {
            this.estabelecimentoComercial = estabelecimentoComercial;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
