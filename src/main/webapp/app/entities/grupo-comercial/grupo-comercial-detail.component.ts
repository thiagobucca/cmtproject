import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGrupoComercial } from 'app/shared/model/grupo-comercial.model';
import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'jhi-grupo-comercial-detail',
    templateUrl: './grupo-comercial-detail.component.html'
})
export class GrupoComercialDetailComponent implements OnInit {
    grupoComercial: IGrupoComercial;

    constructor(private activatedRoute: ActivatedRoute, private auxService: AuxiliarService, private ref: ChangeDetectorRef) {}

    ngOnInit() {
        this.loading = true;
        this.activatedRoute.data.subscribe(({ grupoComercial }) => {
            this.grupoComercial = grupoComercial;
            this.loading = false;
        });
    }
    get loading(): boolean {
        return this.auxService.isLoading;
    }
    set loading(status: boolean) {
        this.auxService.isLoading = status;
    }
    previousState() {
        window.history.back();
    }
}
