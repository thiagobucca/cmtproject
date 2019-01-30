import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoOperacao } from 'app/shared/model/tipo-operacao.model';

@Component({
    selector: 'jhi-tipo-operacao-detail',
    templateUrl: './tipo-operacao-detail.component.html'
})
export class TipoOperacaoDetailComponent implements OnInit {
    tipoOperacao: ITipoOperacao;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tipoOperacao }) => {
            this.tipoOperacao = tipoOperacao;
        });
    }

    previousState() {
        window.history.back();
    }
}
