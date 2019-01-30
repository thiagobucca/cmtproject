import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAgendaEventos } from 'app/shared/model/agenda-eventos.model';

type EntityResponseType = HttpResponse<IAgendaEventos>;
type EntityArrayResponseType = HttpResponse<IAgendaEventos[]>;

@Injectable({ providedIn: 'root' })
export class AgendaEventosService {
    public resourceUrl = SERVER_API_URL + 'api/agenda-eventos';

    constructor(private http: HttpClient) {}

    create(agendaEventos: IAgendaEventos): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(agendaEventos);
        return this.http
            .post<IAgendaEventos>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(agendaEventos: IAgendaEventos): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(agendaEventos);
        return this.http
            .put<IAgendaEventos>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IAgendaEventos>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IAgendaEventos[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(agendaEventos: IAgendaEventos): IAgendaEventos {
        const copy: IAgendaEventos = Object.assign({}, agendaEventos, {
            data: agendaEventos.data != null && agendaEventos.data.isValid() ? agendaEventos.data.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.data = res.body.data != null ? moment(res.body.data) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((agendaEventos: IAgendaEventos) => {
                agendaEventos.data = agendaEventos.data != null ? moment(agendaEventos.data) : null;
            });
        }
        return res;
    }
}
