import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IContatoLojaMaconica } from 'app/shared/model/contato-loja-maconica.model';
import { ContatoLojaMaconicaService } from './contato-loja-maconica.service';

import { JhiAlertService } from 'ng-jhipster';
import { ILojaMaconica } from 'app/shared/model/loja-maconica.model';
import { LojaMaconicaService } from 'app/entities/loja-maconica';

@Component({
    selector: 'jhi-contato-loja-maconica-update',
    templateUrl: './contato-loja-maconica-update.component.html'
})
export class ContatoLojaMaconicaUpdateComponent implements OnInit {
    contatoLojaMaconica: IContatoLojaMaconica;
    isSaving: boolean;
    lojas: ILojaMaconica[];
    constructor(
        private contatoLojaMaconicaService: ContatoLojaMaconicaService,
        private activatedRoute: ActivatedRoute,
        private lojaMaconicaService: LojaMaconicaService,
        private jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ contatoLojaMaconica }) => {
            this.contatoLojaMaconica = contatoLojaMaconica;
        });
        this.lojaMaconicaService.findByStatus(true, { size: 1000 }).subscribe(
            (res: HttpResponse<ILojaMaconica[]>) => {
                this.lojas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.contatoLojaMaconica.id !== undefined) {
            this.subscribeToSaveResponse(this.contatoLojaMaconicaService.update(this.contatoLojaMaconica));
        } else {
            this.subscribeToSaveResponse(this.contatoLojaMaconicaService.create(this.contatoLojaMaconica));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IContatoLojaMaconica>>) {
        result.subscribe((res: HttpResponse<IContatoLojaMaconica>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    trackById(index: number, item: any) {
        return item.id;
    }
}
