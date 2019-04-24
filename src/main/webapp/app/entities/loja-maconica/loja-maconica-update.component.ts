import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ILojaMaconica } from 'app/shared/model/loja-maconica.model';
import { LojaMaconicaService } from './loja-maconica.service';

import { JhiAlertService } from 'ng-jhipster';

import { IContatoLojaMaconica, ContatoLojaMaconica } from 'app/shared/model/contato-loja-maconica.model';
import { ContatoLojaMaconicaService } from 'app/entities/contato-loja-maconica/contato-loja-maconica.service';

import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';

import { Principal } from 'app/core';

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
    roleLoja: any;
    currentAccount: any;
    constructor(
        private lojaMaconicaService: LojaMaconicaService,
        private activatedRoute: ActivatedRoute,
        private jhiAlertService: JhiAlertService,
        private contatoLojaMaconicaService: ContatoLojaMaconicaService,
        private auxService: AuxiliarService,
        private principal: Principal,
        private ref: ChangeDetectorRef
    ) {
        this.indexEdit = -1;
        this.roleLoja = {
            isLojaMaconica: false,
            codLoja: undefined
        };
    }

    get loading(): boolean {
        return this.auxService.isLoading;
    }
    set loading(status: boolean) {
        this.auxService.isLoading = status;
    }

    ngOnInit() {
        this.loading = true;
        this.isSaving = false;
        this.principal.identity().then(account => {
            this.currentAccount = account;
            if (this.currentAccount !== undefined && this.currentAccount.authorities.find(x => x === 'ROLE_LOJA_MACONICA')) {
                if (this.currentAccount.lojaMaconicaId !== undefined) {
                    this.roleLoja.codLoja = this.currentAccount.lojaMaconicaId;
                }
                this.roleLoja.isLojaMaconica = true;
            }
        });
        this.activatedRoute.data.subscribe(({ lojaMaconica }) => {
            this.lojaMaconica = lojaMaconica;
            this.contatoloja = new ContatoLojaMaconica();
            this.loading = false;
            this.ref.detectChanges();
            if (this.lojaMaconica.id !== undefined) {
                this.loading = true;
                this.contatoLojaMaconicaService.findByLoja(this.lojaMaconica.id).subscribe(
                    (res: HttpResponse<IContatoLojaMaconica[]>) => {
                        this.contatolojas = res.body;
                        this.loading = false;
                        this.ref.detectChanges();
                    },
                    (res: HttpErrorResponse) => {
                        this.onError(res.message);
                        this.loading = false;
                        this.ref.detectChanges();
                    }
                );
            }
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.loading = true;
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
                            this.contatoLojaMaconicaService.update(element).subscribe();
                        } else {
                            this.contatoLojaMaconicaService.create(element).subscribe();
                        }
                    });
                }
                if (this.contatolojasDel != null && this.contatolojasDel.length > 0) {
                    this.contatolojasDel.forEach(element => {
                        if (element.id !== undefined) {
                            this.contatoLojaMaconicaService.delete(element.id).subscribe();
                        }
                    });
                }
                this.onSaveSuccess();
            },
            (res: HttpErrorResponse) => {
                this.onSaveError();
                if (res.error !== undefined) {
                    this.onError(res.error.title);
                } else {
                    this.onError(res.message);
                }
            }
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.loading = false;
        this.ref.detectChanges();
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
        this.loading = false;
        this.ref.detectChanges();
    }

    saveItem() {
        if (this.contatolojas === undefined) {
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
        if (this.contatolojasDel === undefined) {
            this.contatolojasDel = [];
        }

        if (this.contatolojas[idx].id === undefined) {
            this.contatolojas.splice(idx, 1);
        } else {
            this.contatolojasDel.push(this.contatolojas[idx]);
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
