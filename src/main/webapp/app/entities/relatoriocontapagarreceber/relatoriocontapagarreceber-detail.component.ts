import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRelatoriocontapagarreceber } from 'app/shared/model/relatoriocontapagarreceber.model';

@Component({
    selector: 'jhi-relatoriocontapagarreceber-detail',
    templateUrl: './relatoriocontapagarreceber-detail.component.html'
})
export class RelatoriocontapagarreceberDetailComponent implements OnInit {
    relatoriocontapagarreceber: IRelatoriocontapagarreceber;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ relatoriocontapagarreceber }) => {
            this.relatoriocontapagarreceber = relatoriocontapagarreceber;
        });
    }

    previousState() {
        window.history.back();
    }
}
