import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { IEstabelecimentoComercial } from 'app/shared/model/estabelecimento-comercial.model';

import { IContatoEstabelecimento, ContatoEstabelecimento } from 'app/shared/model/contato-estabelecimento.model';
import { ContatoEstabelecimentoService } from 'app/entities/contato-estabelecimento/contato-estabelecimento.service';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-estabelecimento-comercial-detail',
    templateUrl: './estabelecimento-comercial-detail.component.html'
})
export class EstabelecimentoComercialDetailComponent implements OnInit {
    estabelecimentoComercial: IEstabelecimentoComercial;
    contatoEstabelecimentos: IContatoEstabelecimento[];
    constructor(
        private dataUtils: JhiDataUtils,
        private activatedRoute: ActivatedRoute,
        private jhiAlertService: JhiAlertService,
        private contatoEstabelecimentoService: ContatoEstabelecimentoService
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ estabelecimentoComercial }) => {
            this.estabelecimentoComercial = estabelecimentoComercial;
            if (this.estabelecimentoComercial.id !== undefined) {
                this.contatoEstabelecimentoService.findByEstabelecimento(this.estabelecimentoComercial.id).subscribe(
                    (res: HttpResponse<IContatoEstabelecimento[]>) => {
                        this.contatoEstabelecimentos = res.body;
                    },
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            }
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
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
