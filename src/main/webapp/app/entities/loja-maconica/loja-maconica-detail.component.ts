import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILojaMaconica } from 'app/shared/model/loja-maconica.model';

@Component({
    selector: 'jhi-loja-maconica-detail',
    templateUrl: './loja-maconica-detail.component.html'
})
export class LojaMaconicaDetailComponent implements OnInit {
    lojaMaconica: ILojaMaconica;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ lojaMaconica }) => {
            this.lojaMaconica = lojaMaconica;
        });
    }

    previousState() {
        window.history.back();
    }
}
