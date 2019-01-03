import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ICupom } from 'app/shared/model/cupom.model';

@Component({
    selector: 'jhi-cupom-detail',
    templateUrl: './cupom-detail.component.html'
})
export class CupomDetailComponent implements OnInit {
    cupom: ICupom;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cupom }) => {
            this.cupom = cupom;
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
