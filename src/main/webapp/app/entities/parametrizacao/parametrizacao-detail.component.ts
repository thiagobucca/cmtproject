import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParametrizacao } from 'app/shared/model/parametrizacao.model';

@Component({
    selector: 'jhi-parametrizacao-detail',
    templateUrl: './parametrizacao-detail.component.html'
})
export class ParametrizacaoDetailComponent implements OnInit {
    parametrizacao: IParametrizacao;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ parametrizacao }) => {
            this.parametrizacao = parametrizacao;
        });
    }

    previousState() {
        window.history.back();
    }
}
