import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContatoEstabelecimento } from 'app/shared/model/contato-estabelecimento.model';

@Component({
    selector: 'jhi-contato-estabelecimento-detail',
    templateUrl: './contato-estabelecimento-detail.component.html'
})
export class ContatoEstabelecimentoDetailComponent implements OnInit {
    contatoEstabelecimento: IContatoEstabelecimento;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ contatoEstabelecimento }) => {
            this.contatoEstabelecimento = contatoEstabelecimento;
        });
    }

    previousState() {
        window.history.back();
    }
}
