import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IContatoLojaMaconica } from 'app/shared/model/contato-loja-maconica.model';
import { ContatoLojaMaconicaService } from './contato-loja-maconica.service';

@Component({
    selector: 'jhi-contato-loja-maconica-update',
    templateUrl: './contato-loja-maconica-update.component.html'
})
export class ContatoLojaMaconicaUpdateComponent implements OnInit {
    contatoLojaMaconica: IContatoLojaMaconica;
    isSaving: boolean;

    constructor(private contatoLojaMaconicaService: ContatoLojaMaconicaService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ contatoLojaMaconica }) => {
            this.contatoLojaMaconica = contatoLojaMaconica;
        });
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
}
