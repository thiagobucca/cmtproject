import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IContatoEstabelecimento } from 'app/shared/model/contato-estabelecimento.model';
import { ContatoEstabelecimentoService } from './contato-estabelecimento.service';

import { JhiAlertService } from 'ng-jhipster';
import { IEstabelecimentoComercial } from 'app/shared/model/estabelecimento-comercial.model';
import { EstabelecimentoComercialService } from 'app/entities/estabelecimento-comercial';

@Component({
    selector: 'jhi-contato-estabelecimento-update',
    templateUrl: './contato-estabelecimento-update.component.html'
})
export class ContatoEstabelecimentoUpdateComponent implements OnInit {
    contatoEstabelecimento: IContatoEstabelecimento;
    isSaving: boolean;
    estabelecimentos: IEstabelecimentoComercial[];
    constructor(
        private contatoEstabelecimentoService: ContatoEstabelecimentoService,
        private activatedRoute: ActivatedRoute,
        private estabelecimentoComercialService: EstabelecimentoComercialService,
        private jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ contatoEstabelecimento }) => {
            this.contatoEstabelecimento = contatoEstabelecimento;
        });

        this.estabelecimentoComercialService.findByStatus(true).subscribe(
            (res: HttpResponse<IEstabelecimentoComercial[]>) => {
                this.estabelecimentos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.contatoEstabelecimento.id !== undefined) {
            this.subscribeToSaveResponse(this.contatoEstabelecimentoService.update(this.contatoEstabelecimento));
        } else {
            this.subscribeToSaveResponse(this.contatoEstabelecimentoService.create(this.contatoEstabelecimento));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IContatoEstabelecimento>>) {
        result.subscribe(
            (res: HttpResponse<IContatoEstabelecimento>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
