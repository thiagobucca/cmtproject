import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { TipoPessoa } from 'app/shared/model/pessoa.model';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUsuarioPortal } from 'app/shared/model/usuarioportal.model';

type EntityArrayResponseType = HttpResponse<IUsuarioPortal[]>;

@Injectable({ providedIn: 'root' })
export class UsuarioportalService {
    public resourceUrl = SERVER_API_URL + 'api/users';

    constructor(private http: HttpClient) {}

    create(user: IUsuarioPortal): Observable<HttpResponse<IUsuarioPortal>> {
        return this.http.post<IUsuarioPortal>(this.resourceUrl, user, { observe: 'response' });
    }

    update(user: IUsuarioPortal): Observable<HttpResponse<IUsuarioPortal>> {
        return this.http.put<IUsuarioPortal>(this.resourceUrl, user, { observe: 'response' });
    }

    find(login: string): Observable<HttpResponse<IUsuarioPortal>> {
        return this.http
            .get<IUsuarioPortal>(`${this.resourceUrl}/${login}`, { observe: 'response' })
            .pipe(map((res: HttpResponse<IUsuarioPortal>) => this.convertDateFromServer(res)));
    }

    findByTipo(tipo: TipoPessoa): Observable<EntityArrayResponseType> {
        return this.http.get<IUsuarioPortal[]>(`${this.resourceUrl}/tipo/${tipo}`, { observe: 'response' });
    }
    findByStatus(status: boolean): Observable<EntityArrayResponseType> {
        return this.http.get<IUsuarioPortal[]>(`${this.resourceUrl}/status/${status}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<IUsuarioPortal[]>> {
        const options = createRequestOption(req);
        return this.http.get<IUsuarioPortal[]>(this.resourceUrl, { params: options, observe: 'response' });
    }
    queryIdLoja(req?: any, id?: number): Observable<HttpResponse<IUsuarioPortal[]>> {
        const options = createRequestOption(req);
        return this.http.get<IUsuarioPortal[]>(`${this.resourceUrl}/lojaMaconica/${id}`, { params: options, observe: 'response' });
    }

    delete(login: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${login}`, { observe: 'response' });
    }

    authorities(): Observable<string[]> {
        return this.http.get<string[]>(SERVER_API_URL + 'api/users/authorities');
    }

    protected convertDateFromServer(res: HttpResponse<IUsuarioPortal>): HttpResponse<IUsuarioPortal> {
        if (res.body) {
            res.body.dataNascimento = res.body.dataNascimento != null ? moment(res.body.dataNascimento) : null;
        }
        return res;
    }
}
