import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContatoLojaMaconica } from 'app/shared/model/contato-loja-maconica.model';

@Component({
    selector: 'jhi-contato-loja-maconica-detail',
    templateUrl: './contato-loja-maconica-detail.component.html'
})
export class ContatoLojaMaconicaDetailComponent implements OnInit {
    contatoLojaMaconica: IContatoLojaMaconica;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ contatoLojaMaconica }) => {
            this.contatoLojaMaconica = contatoLojaMaconica;
        });
    }

    previousState() {
        window.history.back();
    }
}
