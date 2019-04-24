import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ICupom } from 'app/shared/model/cupom.model';

import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'jhi-cupom-detail',
    templateUrl: './cupom-detail.component.html'
})
export class CupomDetailComponent implements OnInit {
    cupom: ICupom;

    constructor(
        private dataUtils: JhiDataUtils,
        private activatedRoute: ActivatedRoute,
        private auxService: AuxiliarService,
        private ref: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.loading = true;
        this.activatedRoute.data.subscribe(({ cupom }) => {
            this.cupom = cupom;
            this.loading = false;
        });
    }
    get loading(): boolean {
        return this.auxService.isLoading;
    }
    set loading(status: boolean) {
        this.auxService.isLoading = status;
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
