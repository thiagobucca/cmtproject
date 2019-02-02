import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { ILojaMaconica } from 'app/shared/model/loja-maconica.model';
import { IContatoLojaMaconica, ContatoLojaMaconica } from 'app/shared/model/contato-loja-maconica.model';
import { ContatoLojaMaconicaService } from 'app/entities/contato-loja-maconica/contato-loja-maconica.service';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-loja-maconica-detail',
    templateUrl: './loja-maconica-detail.component.html'
})
export class LojaMaconicaDetailComponent implements OnInit {
    lojaMaconica: ILojaMaconica;
    contatolojas: IContatoLojaMaconica[];
    constructor(
        private activatedRoute: ActivatedRoute,
        private jhiAlertService: JhiAlertService,
        private contatoLojaMaconicaService: ContatoLojaMaconicaService
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ lojaMaconica }) => {
            this.lojaMaconica = lojaMaconica;
            if (this.lojaMaconica.id !== undefined) {
                this.contatoLojaMaconicaService.findByLoja(this.lojaMaconica.id).subscribe(
                    (res: HttpResponse<IContatoLojaMaconica[]>) => {
                        this.contatolojas = res.body;
                    },
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            }
        });
    }

    previousState() {
        window.history.back();
    }
    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
    trackById(index: number, item: any) {
        return item.id;
    }
}
