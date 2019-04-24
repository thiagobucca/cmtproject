import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

import { TipoPessoa } from 'app/shared/model/pessoa.model';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMembro } from 'app/shared/model/membro.model';

type EntityArrayResponseType = HttpResponse<IMembro[]>;

@Injectable({ providedIn: 'root' })
export class MembroService {
    public resourceUrl = SERVER_API_URL + 'api/users';

    constructor(private http: HttpClient) {}

    create(user: IMembro): Observable<HttpResponse<IMembro>> {
        return this.http.post<IMembro>(this.resourceUrl, user, { observe: 'response' });
    }

    update(user: IMembro): Observable<HttpResponse<IMembro>> {
        return this.http.put<IMembro>(this.resourceUrl, user, { observe: 'response' });
    }

    find(login: string): Observable<HttpResponse<IMembro>> {
        return this.http
            .get<IMembro>(`${this.resourceUrl}/${login}`, { observe: 'response' })
            .pipe(map((res: HttpResponse<IMembro>) => this.convertDateFromServer(res)));
    }

    findByTipo(tipo: TipoPessoa): Observable<EntityArrayResponseType> {
        return this.http.get<IMembro[]>(`${this.resourceUrl}/tipo/${tipo}`, { observe: 'response' });
    }

    findByStatus(status: boolean, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMembro[]>(`${this.resourceUrl}/status/${status}`, { params: options, observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<IMembro[]>> {
        const options = createRequestOption(req);
        return this.http.get<IMembro[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    queryIdLoja(req?: any, id?: number): Observable<HttpResponse<IMembro[]>> {
        const options = createRequestOption(req);
        return this.http.get<IMembro[]>(`${this.resourceUrl}/lojaMaconica/${id}`, { params: options, observe: 'response' });
    }

    delete(login: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${login}`, { observe: 'response' });
    }

    authorities(): Observable<string[]> {
        return this.http.get<string[]>(SERVER_API_URL + 'api/users/authorities');
    }

    protected convertDateFromServer(res: HttpResponse<IMembro>): HttpResponse<IMembro> {
        if (res.body) {
            res.body.dataNascimento = res.body.dataNascimento != null ? moment(res.body.dataNascimento) : null;
        }
        return res;
    }
}
