import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { IEstabelecimentoComercial } from 'app/shared/model/estabelecimento-comercial.model';

import { IContatoEstabelecimento, ContatoEstabelecimento } from 'app/shared/model/contato-estabelecimento.model';
import { ContatoEstabelecimentoService } from 'app/entities/contato-estabelecimento/contato-estabelecimento.service';
import { JhiAlertService } from 'ng-jhipster';

import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';

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
        private contatoEstabelecimentoService: ContatoEstabelecimentoService,
        private auxService: AuxiliarService,
        private ref: ChangeDetectorRef
    ) {}
    get loading(): boolean {
        return this.auxService.isLoading;
    }
    set loading(status: boolean) {
        this.auxService.isLoading = status;
    }
    ngOnInit() {
        this.loading = true;
        this.activatedRoute.data.subscribe(({ estabelecimentoComercial }) => {
            this.estabelecimentoComercial = estabelecimentoComercial;
            if (this.estabelecimentoComercial.id !== undefined) {
                this.contatoEstabelecimentoService.findByEstabelecimento(this.estabelecimentoComercial.id).subscribe(
                    (res: HttpResponse<IContatoEstabelecimento[]>) => {
                        this.contatoEstabelecimentos = res.body;
                        this.loading = false;
                    },
                    (res: HttpErrorResponse) => {
                        this.onError(res.message);
                        this.loading = false;
                    }
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
