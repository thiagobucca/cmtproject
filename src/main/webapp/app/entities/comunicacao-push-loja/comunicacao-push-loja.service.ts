import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IComunicacaoPushLoja } from 'app/shared/model/comunicacao-push-loja.model';
import { IComunicacaoPush } from 'app/shared/model/comunicacao-push.model';

type EntityResponseType = HttpResponse<IComunicacaoPushLoja>;
type EntityArrayResponseType = HttpResponse<IComunicacaoPushLoja[]>;

@Injectable({ providedIn: 'root' })
export class ComunicacaoPushLojaService {
    public resourceUrl = SERVER_API_URL + 'api/comunicacao-push-lojas';

    constructor(private http: HttpClient) {}

    create(comunicacaoPushLoja: IComunicacaoPushLoja): Observable<EntityResponseType> {
        return this.http.post<IComunicacaoPushLoja>(this.resourceUrl, comunicacaoPushLoja, { observe: 'response' });
    }

    update(comunicacaoPushLoja: IComunicacaoPushLoja): Observable<EntityResponseType> {
        return this.http.put<IComunicacaoPushLoja>(this.resourceUrl, comunicacaoPushLoja, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IComunicacaoPushLoja>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    findByIdPush(id: number): Observable<EntityArrayResponseType> {
        return this.http.get<IComunicacaoPush[]>(`${this.resourceUrl}/lojamaconica/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IComunicacaoPushLoja[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
