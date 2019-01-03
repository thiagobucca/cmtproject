import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IAgendaEventos } from 'app/shared/model/agenda-eventos.model';
import { AgendaEventosService } from './agenda-eventos.service';
import { ILojaMaconica } from 'app/shared/model/loja-maconica.model';
import { LojaMaconicaService } from 'app/entities/loja-maconica';

@Component({
    selector: 'jhi-agenda-eventos-update',
    templateUrl: './agenda-eventos-update.component.html'
})
export class AgendaEventosUpdateComponent implements OnInit {
    agendaEventos: IAgendaEventos;
    isSaving: boolean;

    lojamaconicas: ILojaMaconica[];
    data: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private agendaEventosService: AgendaEventosService,
        private lojaMaconicaService: LojaMaconicaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ agendaEventos }) => {
            this.agendaEventos = agendaEventos;
            this.data = this.agendaEventos.data != null ? this.agendaEventos.data.format(DATE_TIME_FORMAT) : null;
        });
        this.lojaMaconicaService.query({ filter: 'agendaeventos-is-null' }).subscribe(
            (res: HttpResponse<ILojaMaconica[]>) => {
                if (!this.agendaEventos.lojaMaconica || !this.agendaEventos.lojaMaconica.id) {
                    this.lojamaconicas = res.body;
                } else {
                    this.lojaMaconicaService.find(this.agendaEventos.lojaMaconica.id).subscribe(
                        (subRes: HttpResponse<ILojaMaconica>) => {
                            this.lojamaconicas = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.agendaEventos.data = this.data != null ? moment(this.data, DATE_TIME_FORMAT) : null;
        if (this.agendaEventos.id !== undefined) {
            this.subscribeToSaveResponse(this.agendaEventosService.update(this.agendaEventos));
        } else {
            this.subscribeToSaveResponse(this.agendaEventosService.create(this.agendaEventos));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAgendaEventos>>) {
        result.subscribe((res: HttpResponse<IAgendaEventos>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackLojaMaconicaById(index: number, item: ILojaMaconica) {
        return item.id;
    }
}
