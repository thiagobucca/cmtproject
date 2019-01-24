import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IComunicacaoPushLoja } from 'app/shared/model/comunicacao-push-loja.model';

@Component({
    selector: 'jhi-comunicacao-push-loja-detail',
    templateUrl: './comunicacao-push-loja-detail.component.html'
})
export class ComunicacaoPushLojaDetailComponent implements OnInit {
    comunicacaoPushLoja: IComunicacaoPushLoja;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ comunicacaoPushLoja }) => {
            this.comunicacaoPushLoja = comunicacaoPushLoja;
        });
    }

    previousState() {
        window.history.back();
    }
}
