import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMembro } from 'app/shared/model/membro.model';

type EntityResponseType = HttpResponse<IMembro>;
type EntityArrayResponseType = HttpResponse<IMembro[]>;

@Injectable({ providedIn: 'root' })
export class MembroService {
    public resourceUrl = SERVER_API_URL + 'api/membros';

    constructor(private http: HttpClient) {}

    create(membro: IMembro): Observable<EntityResponseType> {
        return this.http.post<IMembro>(this.resourceUrl, membro, { observe: 'response' });
    }

    update(membro: IMembro): Observable<EntityResponseType> {
        return this.http.put<IMembro>(this.resourceUrl, membro, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMembro>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMembro[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
