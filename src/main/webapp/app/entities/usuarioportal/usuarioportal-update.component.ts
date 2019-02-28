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

@Component({
    selector: 'jhi-usuarioportal-update',
    templateUrl: './usuarioportal-update.component.html'
})
export class UsuarioportalUpdateComponent implements OnInit {
    user: UsuarioPortal;
    languages: any[];
    authorities: any[];
    isSaving: boolean;
    lojas: ILojaMaconica[];
    macons: IUser[];
    data: string;
    constructor(
        private languageHelper: JhiLanguageHelper,
        private userService: UsuarioportalService,
        private route: ActivatedRoute,
        private lojaMaconicaService: LojaMaconicaService,
        private jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ user }) => {
            this.user = user;
            this.data = this.user.dataNascimento != null ? this.user.dataNascimento.format(DATE_FORMAT) : null;
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
            (res: HttpResponse<IUser[]>) => {
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

    private onSaveSuccess(result) {
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
