import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ILojaMaconica } from 'app/shared/model/loja-maconica.model';
import { LojaMaconicaService } from './loja-maconica.service';

import { JhiAlertService } from 'ng-jhipster';

import { IContatoLojaMaconica, ContatoLojaMaconica } from 'app/shared/model/contato-loja-maconica.model';
import { ContatoLojaMaconicaService } from 'app/entities/contato-loja-maconica/contato-loja-maconica.service';

@Component({
    selector: 'jhi-loja-maconica-update',
    templateUrl: './loja-maconica-update.component.html'
})
export class LojaMaconicaUpdateComponent implements OnInit {
    lojaMaconica: ILojaMaconica;
    isSaving: boolean;
    contatoloja: IContatoLojaMaconica;
    contatolojas: IContatoLojaMaconica[];
    contatolojasDel: IContatoLojaMaconica[];
    indexEdit: number;
    constructor(
        private lojaMaconicaService: LojaMaconicaService,
        private activatedRoute: ActivatedRoute,
        private jhiAlertService: JhiAlertService,
        private contatoLojaMaconicaService: ContatoLojaMaconicaService
    ) {
        this.indexEdit = -1;
    }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ lojaMaconica }) => {
            this.lojaMaconica = lojaMaconica;
            this.lojaMaconica = new ContatoLojaMaconica();
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

    save() {
        this.isSaving = true;
        if (this.lojaMaconica.id !== undefined) {
            this.subscribeToSaveResponse(this.lojaMaconicaService.update(this.lojaMaconica));
        } else {
            this.subscribeToSaveResponse(this.lojaMaconicaService.create(this.lojaMaconica));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILojaMaconica>>) {
        result.subscribe(
            (res: HttpResponse<ILojaMaconica>) => {
                const dados = res.body;
                if (this.contatolojas != null && this.contatolojas.length > 0) {
                    this.contatolojas.forEach(element => {
                        element.lojaMaconicaId = dados.id;
                        if (element.id !== undefined) {
                            this.contatoLojaMaconicaService.update(element);
                        } else {
                            this.contatoLojaMaconicaService.create(element);
                        }
                    });
                }
                if (this.contatolojasDel != null && this.contatolojasDel.length > 0) {
                    this.contatolojasDel.forEach(element => {
                        if (element.id !== undefined) {
                            this.contatoLojaMaconicaService.delete(element.id);
                        }
                    });
                }
                this.onSaveSuccess();
            },
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

    saveItem() {
        if (this.contatoloja == null) {
            this.contatolojas = [];
        }

        if (this.indexEdit > -1) {
            {
                this.contatolojas[this.indexEdit] = this.contatoloja;
            }
        } else {
            this.contatolojas.push(this.contatoloja);
        }

        this.contatoloja = new ContatoLojaMaconica();
        this.indexEdit = -1;
    }
    editarItem(idx: number) {
        this.contatoloja = JSON.parse(JSON.stringify(this.contatolojas[idx]));
        this.indexEdit = idx;
    }

    deletar(idx: number) {
        if (this.contatolojasDel === null) {
            this.contatolojasDel = [];
        }

        if (this.contatoloja[idx].id === undefined) {
            this.contatolojas.splice(idx, 1);
        } else {
            this.contatolojasDel.push(this.contatoloja[idx]);
            this.contatolojas.splice(idx, 1);
        }
    }
    cancelar() {
        this.contatoloja = new ContatoLojaMaconica();
        this.indexEdit = -1;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
    trackById(index: number, item: any) {
        return item.id;
    }
}
