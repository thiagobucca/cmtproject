import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUsuarioportal } from 'app/shared/model/usuarioportal.model';

@Component({
    selector: 'jhi-usuarioportal-detail',
    templateUrl: './usuarioportal-detail.component.html'
})
export class UsuarioportalDetailComponent implements OnInit {
    usuarioportal: IUsuarioportal;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ usuarioportal }) => {
            this.usuarioportal = usuarioportal;
        });
    }

    previousState() {
        window.history.back();
    }
}
