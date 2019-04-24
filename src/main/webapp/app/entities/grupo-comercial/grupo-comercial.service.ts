import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGrupoComercial } from 'app/shared/model/grupo-comercial.model';

type EntityResponseType = HttpResponse<IGrupoComercial>;
type EntityArrayResponseType = HttpResponse<IGrupoComercial[]>;

@Injectable({ providedIn: 'root' })
export class GrupoComercialService {
    public resourceUrl = SERVER_API_URL + 'api/grupos';

    constructor(private http: HttpClient) {}

    create(grupoComercial: IGrupoComercial): Observable<EntityResponseType> {
        return this.http.post<IGrupoComercial>(this.resourceUrl, grupoComercial, { observe: 'response' });
    }

    update(grupoComercial: IGrupoComercial): Observable<EntityResponseType> {
        return this.http.put<IGrupoComercial>(this.resourceUrl, grupoComercial, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGrupoComercial>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGrupoComercial[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
