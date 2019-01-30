import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICategoriaEstabelecimento } from 'app/shared/model/categoria-estabelecimento.model';

@Component({
    selector: 'jhi-categoria-estabelecimento-detail',
    templateUrl: './categoria-estabelecimento-detail.component.html'
})
export class CategoriaEstabelecimentoDetailComponent implements OnInit {
    categoriaEstabelecimento: ICategoriaEstabelecimento;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ categoriaEstabelecimento }) => {
            this.categoriaEstabelecimento = categoriaEstabelecimento;
        });
    }

    previousState() {
        window.history.back();
    }
}
