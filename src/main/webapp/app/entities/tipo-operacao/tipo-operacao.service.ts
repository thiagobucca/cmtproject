import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITipoOperacao } from 'app/shared/model/tipo-operacao.model';

type EntityResponseType = HttpResponse<ITipoOperacao>;
type EntityArrayResponseType = HttpResponse<ITipoOperacao[]>;

@Injectable({ providedIn: 'root' })
export class TipoOperacaoService {
    public resourceUrl = SERVER_API_URL + 'api/tipo-operacaos';

    constructor(private http: HttpClient) {}

    create(tipoOperacao: ITipoOperacao): Observable<EntityResponseType> {
        return this.http.post<ITipoOperacao>(this.resourceUrl, tipoOperacao, { observe: 'response' });
    }

    update(tipoOperacao: ITipoOperacao): Observable<EntityResponseType> {
        return this.http.put<ITipoOperacao>(this.resourceUrl, tipoOperacao, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITipoOperacao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITipoOperacao[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
