import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAgendaEventos } from 'app/shared/model/agenda-eventos.model';
import { Principal } from 'app/core';
import { AgendaEventosService } from './agenda-eventos.service';

@Component({
    selector: 'jhi-agenda-eventos',
    templateUrl: './agenda-eventos.component.html'
})
export class AgendaEventosComponent implements OnInit, OnDestroy {
    agendaEventos: IAgendaEventos[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private agendaEventosService: AgendaEventosService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.agendaEventosService.query().subscribe(
            (res: HttpResponse<IAgendaEventos[]>) => {
                this.agendaEventos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAgendaEventos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAgendaEventos) {
        return item.id;
    }

    registerChangeInAgendaEventos() {
        this.eventSubscriber = this.eventManager.subscribe('agendaEventosListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
