import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT, DATE_FORMAT, TIME_FORMAT } from 'app/shared/constants/input.constants';

import { JhiAlertService } from 'ng-jhipster';
import { IAgendaEventos } from 'app/shared/model/agenda-eventos.model';
import { AgendaEventosService } from './agenda-eventos.service';
import { ILojaMaconica } from 'app/shared/model/loja-maconica.model';
import { LojaMaconicaService } from 'app/entities/loja-maconica';

import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'jhi-agenda-eventos-update',
    templateUrl: './agenda-eventos-update.component.html'
})
export class AgendaEventosUpdateComponent implements OnInit {
    agendaEventos: IAgendaEventos;
    isSaving: boolean;
    data: string;
    hora: string;
    lojas: ILojaMaconica[];
    constructor(
        private agendaEventosService: AgendaEventosService,
        private activatedRoute: ActivatedRoute,
        private lojaMaconicaService: LojaMaconicaService,
        private jhiAlertService: JhiAlertService,
        private auxService: AuxiliarService,
        private ref: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.loading = true;
        this.activatedRoute.data.subscribe(({ agendaEventos }) => {
            this.agendaEventos = agendaEventos;
            this.data = this.agendaEventos.data != null ? this.agendaEventos.data.format(DATE_TIME_FORMAT) : null;
            this.data = this.agendaEventos.data != null ? this.agendaEventos.data.format(DATE_FORMAT) : null;
            this.hora = this.agendaEventos.data != null ? this.agendaEventos.data.format(TIME_FORMAT) : null;
        });
        this.lojaMaconicaService.findByStatus(true).subscribe(
            (res: HttpResponse<ILojaMaconica[]>) => {
                this.lojas = res.body;
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
    get loading(): boolean {
        return this.auxService.isLoading;
    }
    set loading(status: boolean) {
        this.auxService.isLoading = status;
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.loading = true;

        this.agendaEventos.data = this.data != null && this.hora != null ? moment(this.data + 'T' + this.hora, DATE_TIME_FORMAT) : null;
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
        this.loading = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
        this.loading = false;
    }
    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
    trackById(index: number, item: any) {
        return item.id;
    }
}
