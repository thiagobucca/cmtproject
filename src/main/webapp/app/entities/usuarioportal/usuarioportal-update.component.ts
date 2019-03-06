import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiLanguageHelper, User, UserService, IUser } from 'app/core';
import { UsuarioportalService } from './index';
import { IUsuarioPortal, UsuarioPortal } from 'app/shared/model/usuarioportal.model';
import { DATE_TIME_FORMAT, DATE_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import * as moment from 'moment';
import { TipoPessoa } from 'app/shared/model/pessoa.model';
import { ILojaMaconica } from 'app/shared/model/loja-maconica.model';
import { LojaMaconicaService } from 'app/entities/loja-maconica';
import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'jhi-usuarioportal-update',
    templateUrl: './usuarioportal-update.component.html'
})
export class UsuarioportalUpdateComponent implements OnInit {
    user: UsuarioPortal;
    languages: any[];
    authorities: any[];
    authoritiesSelecionado: any[];
    isSaving: boolean;
    lojas: ILojaMaconica[];
    macons: IUsuarioPortal[];
    data: string;
    constructor(
        private languageHelper: JhiLanguageHelper,
        private userService: UsuarioportalService,
        private route: ActivatedRoute,
        private lojaMaconicaService: LojaMaconicaService,
        private jhiAlertService: JhiAlertService,
        private auxService: AuxiliarService,
        private ref: ChangeDetectorRef
    ) {
        this.authoritiesSelecionado = [];
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
        this.route.data.subscribe(({ user }) => {
            this.user = user;
            this.user.tipoPessoa = <TipoPessoa>'Macom';
            this.data = this.user.dataNascimento != null ? this.user.dataNascimento.format(DATE_FORMAT) : null;
            this.loading = false;
            this.authoritiesSelecionado = user.authorities;
            this.ref.detectChanges();
        });
        this.authorities = [];
        this.userService.authorities().subscribe(authorities => {
            this.authorities = authorities;
        });
        this.languageHelper.getAll().then(languages => {
            this.languages = languages;
        });
        this.lojaMaconicaService.findByStatus(true).subscribe(
            (res: HttpResponse<ILojaMaconica[]>) => {
                this.lojas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.userService.findByTipo(TipoPessoa.Macom).subscribe(
            (res: HttpResponse<IUsuarioPortal[]>) => {
                this.macons = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.user.langKey = 'pt-br';
        this.loading = true;

        this.user.dataNascimento = this.data != null ? moment(this.data, DATE_TIME_FORMAT) : null;
        if (this.user.id !== null) {
            this.userService.update(this.user).subscribe(
                response => this.onSaveSuccess(response),
                (res: HttpErrorResponse) => {
                    this.onSaveError();
                    if (res.error !== undefined) {
                        this.onError(res.error.title);
                    } else {
                        this.onError(res.message);
                    }
                }
            );
        } else {
            this.userService.create(this.user).subscribe(
                response => this.onSaveSuccess(response),
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
    }
    selecionarAuth(id: any) {
        if (id === 0) {
            if (this.authoritiesSelecionado.length !== this.lojas.length) {
                this.lojas.forEach(value => {
                    this.authoritiesSelecionado.push(value.id);
                });
            } else {
                this.authoritiesSelecionado = [];
            }
        } else {
            if (this.authoritiesSelecionado === undefined || this.authoritiesSelecionado === null) {
                this.authoritiesSelecionado = [];
                this.authoritiesSelecionado.push(id);
            } else if (this.authoritiesSelecionado.indexOf(id) > -1) {
                this.authoritiesSelecionado.splice(this.authoritiesSelecionado.indexOf(id), 1);
            } else {
                this.authoritiesSelecionado.push(id);
            }
        }

        this.user.authorities = this.authoritiesSelecionado.length > 0 ? this.authoritiesSelecionado : null;
    }
    private onSaveSuccess(result) {
        this.isSaving = false;
        this.previousState();
        this.loading = false;
        this.ref.detectChanges();
    }

    private onSaveError() {
        this.isSaving = false;
        this.loading = false;
        this.ref.detectChanges();
    }
    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
    trackById(index: number, item: any) {
        return item.id;
    }
}
