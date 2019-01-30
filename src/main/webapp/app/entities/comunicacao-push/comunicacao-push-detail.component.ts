import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IComunicacaoPush } from 'app/shared/model/comunicacao-push.model';

@Component({
    selector: 'jhi-comunicacao-push-detail',
    templateUrl: './comunicacao-push-detail.component.html'
})
export class ComunicacaoPushDetailComponent implements OnInit {
    comunicacaoPush: IComunicacaoPush;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ comunicacaoPush }) => {
            this.comunicacaoPush = comunicacaoPush;
        });
    }

    previousState() {
        window.history.back();
    }
}
