import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEstabelecimentoComercial } from 'app/shared/model/estabelecimento-comercial.model';

type EntityResponseType = HttpResponse<IEstabelecimentoComercial>;
type EntityArrayResponseType = HttpResponse<IEstabelecimentoComercial[]>;

@Injectable({ providedIn: 'root' })
export class EstabelecimentoComercialService {
    public resourceUrl = SERVER_API_URL + 'api/estabelecimento-comercials';

    constructor(private http: HttpClient) {}

    create(estabelecimentoComercial: IEstabelecimentoComercial): Observable<EntityResponseType> {
        return this.http.post<IEstabelecimentoComercial>(this.resourceUrl, estabelecimentoComercial, { observe: 'response' });
    }

    update(estabelecimentoComercial: IEstabelecimentoComercial): Observable<EntityResponseType> {
        return this.http.put<IEstabelecimentoComercial>(this.resourceUrl, estabelecimentoComercial, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEstabelecimentoComercial>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    findByStatus(status: boolean): Observable<EntityArrayResponseType> {
        return this.http.get<IEstabelecimentoComercial[]>(`${this.resourceUrl}/status/${status}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEstabelecimentoComercial[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
