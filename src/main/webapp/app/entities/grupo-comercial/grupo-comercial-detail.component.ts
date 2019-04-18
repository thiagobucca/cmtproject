import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGrupoComercial } from 'app/shared/model/grupo-comercial.model';

@Component({
    selector: 'jhi-grupo-comercial-detail',
    templateUrl: './grupo-comercial-detail.component.html'
})
export class GrupoComercialDetailComponent implements OnInit {
    grupoComercial: IGrupoComercial;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ grupoComercial }) => {
            this.grupoComercial = grupoComercial;
        });
    }

    previousState() {
        window.history.back();
    }
}
