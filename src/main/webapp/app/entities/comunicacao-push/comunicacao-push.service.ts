import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IComunicacaoPush } from 'app/shared/model/comunicacao-push.model';

type EntityResponseType = HttpResponse<IComunicacaoPush>;
type EntityArrayResponseType = HttpResponse<IComunicacaoPush[]>;

@Injectable({ providedIn: 'root' })
export class ComunicacaoPushService {
    public resourceUrl = SERVER_API_URL + 'api/comunicacao-pushes';

    constructor(private http: HttpClient) {}

    create(comunicacaoPush: IComunicacaoPush): Observable<EntityResponseType> {
        return this.http.post<IComunicacaoPush>(this.resourceUrl, comunicacaoPush, { observe: 'response' });
    }

    update(comunicacaoPush: IComunicacaoPush): Observable<EntityResponseType> {
        return this.http.put<IComunicacaoPush>(this.resourceUrl, comunicacaoPush, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IComunicacaoPush>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IComunicacaoPush[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
