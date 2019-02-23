import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { IAgendaEventos } from 'app/shared/model/agenda-eventos.model';

@Component({
    selector: 'jhi-agenda-eventos-detail',
    templateUrl: './agenda-eventos-detail.component.html'
})
export class AgendaEventosDetailComponent implements OnInit {
    agendaEventos: IAgendaEventos;

    constructor(private activatedRoute: ActivatedRoute, private auxService: AuxiliarService) {}

    ngOnInit() {
        this.loading = true;
        this.activatedRoute.data.subscribe(({ agendaEventos }) => {
            this.agendaEventos = agendaEventos;
            this.loading = false;
        });
    }

    previousState() {
        window.history.back();
    }
    get loading(): boolean {
        return this.auxService.isLoading;
    }
    set loading(status: boolean) {
        this.auxService.isLoading = status;
    }
}
