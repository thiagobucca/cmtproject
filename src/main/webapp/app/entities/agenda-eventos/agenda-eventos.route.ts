import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AgendaEventos } from 'app/shared/model/agenda-eventos.model';
import { AgendaEventosService } from './agenda-eventos.service';
import { AgendaEventosComponent } from './agenda-eventos.component';
import { AgendaEventosDetailComponent } from './agenda-eventos-detail.component';
import { AgendaEventosUpdateComponent } from './agenda-eventos-update.component';
import { AgendaEventosDeletePopupComponent } from './agenda-eventos-delete-dialog.component';
import { IAgendaEventos } from 'app/shared/model/agenda-eventos.model';

@Injectable({ providedIn: 'root' })
export class AgendaEventosResolve implements Resolve<IAgendaEventos> {
    constructor(private service: AgendaEventosService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AgendaEventos> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<AgendaEventos>) => response.ok),
                map((agendaEventos: HttpResponse<AgendaEventos>) => agendaEventos.body)
            );
        }
        return of(new AgendaEventos());
    }
}

export const agendaEventosRoute: Routes = [
    {
        path: 'agenda-eventos',
        component: AgendaEventosComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            defaultSort: 'data,asc',
            pageTitle: 'Agenda de Eventos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'agenda-eventos/:id/view',
        component: AgendaEventosDetailComponent,
        resolve: {
            agendaEventos: AgendaEventosResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'Agenda de Eventos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'agenda-eventos/new',
        component: AgendaEventosUpdateComponent,
        resolve: {
            agendaEventos: AgendaEventosResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'Agenda de Eventos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'agenda-eventos/:id/edit',
        component: AgendaEventosUpdateComponent,
        resolve: {
            agendaEventos: AgendaEventosResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'Agenda de Eventos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const agendaEventosPopupRoute: Routes = [
    {
        path: 'agenda-eventos/:id/delete',
        component: AgendaEventosDeletePopupComponent,
        resolve: {
            agendaEventos: AgendaEventosResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'Agenda de Eventos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
