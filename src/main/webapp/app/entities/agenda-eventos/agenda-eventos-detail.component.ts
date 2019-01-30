import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAgendaEventos } from 'app/shared/model/agenda-eventos.model';

@Component({
    selector: 'jhi-agenda-eventos-detail',
    templateUrl: './agenda-eventos-detail.component.html'
})
export class AgendaEventosDetailComponent implements OnInit {
    agendaEventos: IAgendaEventos;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ agendaEventos }) => {
            this.agendaEventos = agendaEventos;
        });
    }

    previousState() {
        window.history.back();
    }
}
