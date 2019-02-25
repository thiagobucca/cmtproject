import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRelatoriocupomxcmt } from 'app/shared/model/relatoriocupomxcmt.model';

type EntityResponseType = HttpResponse<IRelatoriocupomxcmt>;
type EntityArrayResponseType = HttpResponse<IRelatoriocupomxcmt[]>;

@Injectable({ providedIn: 'root' })
export class RelatoriocupomxcmtService {
    public resourceUrl = SERVER_API_URL + 'api/relatoriocupomxcmts';

    constructor(private http: HttpClient) {}

    create(relatoriocupomxcmt: IRelatoriocupomxcmt): Observable<EntityResponseType> {
        return this.http.post<IRelatoriocupomxcmt>(this.resourceUrl, relatoriocupomxcmt, { observe: 'response' });
    }

    update(relatoriocupomxcmt: IRelatoriocupomxcmt): Observable<EntityResponseType> {
        return this.http.put<IRelatoriocupomxcmt>(this.resourceUrl, relatoriocupomxcmt, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRelatoriocupomxcmt>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRelatoriocupomxcmt[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
