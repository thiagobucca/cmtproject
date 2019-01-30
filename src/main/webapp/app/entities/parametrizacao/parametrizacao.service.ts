import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IParametrizacao } from 'app/shared/model/parametrizacao.model';

type EntityResponseType = HttpResponse<IParametrizacao>;
type EntityArrayResponseType = HttpResponse<IParametrizacao[]>;

@Injectable({ providedIn: 'root' })
export class ParametrizacaoService {
    public resourceUrl = SERVER_API_URL + 'api/parametrizacaos';

    constructor(private http: HttpClient) {}

    create(parametrizacao: IParametrizacao): Observable<EntityResponseType> {
        return this.http.post<IParametrizacao>(this.resourceUrl, parametrizacao, { observe: 'response' });
    }

    update(parametrizacao: IParametrizacao): Observable<EntityResponseType> {
        return this.http.put<IParametrizacao>(this.resourceUrl, parametrizacao, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IParametrizacao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IParametrizacao[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
