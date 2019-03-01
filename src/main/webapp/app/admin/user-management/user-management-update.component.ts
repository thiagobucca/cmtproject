import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiLanguageHelper, User, UserService, IUser } from 'app/core';
import { DATE_TIME_FORMAT, DATE_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import * as moment from 'moment';
import { TipoPessoa } from 'app/shared/model/pessoa.model';
import { ILojaMaconica } from 'app/shared/model/loja-maconica.model';
import { LojaMaconicaService } from 'app/entities/loja-maconica';

@Component({
    selector: 'jhi-user-mgmt-update',
    templateUrl: './user-management-update.component.html'
})
export class UserMgmtUpdateComponent implements OnInit {
    user: User;
    languages: any[];
    authorities: any[];
    isSaving: boolean;
    lojas: ILojaMaconica[];
    macons: IUser[];
    data: string;
    constructor(
        private languageHelper: JhiLanguageHelper,
        private userService: UserService,
        private route: ActivatedRoute,
        private lojaMaconicaService: LojaMaconicaService,
        private jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ user }) => {
            this.user = user;
            this.data = user.dataNascimento != null ? user.dataNascimento.substr(0, 10) : null;
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
            this.userService.update(this.user).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
        } else {
            this.userService.create(this.user).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
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

    onChangeTipoPessoa(event) {
        this.user.lojaMaconicaId = undefined;
        this.user.pessoaDependenteId = undefined;
    }

    onChangeMacom(event) {
        const dependencia = this.macons.find(x => x.id == event);
        if (dependencia != null) {
            this.user.lojaMaconicaId = dependencia.lojaMaconicaId;
            this.user.placet = dependencia.placet;
        } else {
            this.user.lojaMaconicaId = undefined;
            this.user.placet = undefined;
        }
    }
}
