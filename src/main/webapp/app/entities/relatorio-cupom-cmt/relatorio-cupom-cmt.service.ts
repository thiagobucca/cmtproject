import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRelatorioCupomCmt } from 'app/shared/model/relatorio-cupom-cmt.model';

type EntityResponseType = HttpResponse<IRelatorioCupomCmt>;
type EntityArrayResponseType = HttpResponse<IRelatorioCupomCmt[]>;

@Injectable({ providedIn: 'root' })
export class RelatorioCupomCmtService {
    public resourceUrl = SERVER_API_URL + 'api/relatorio-cupom-cmts';

    constructor(private http: HttpClient) {}

    create(relatorioCupomCmt: IRelatorioCupomCmt): Observable<EntityResponseType> {
        return this.http.post<IRelatorioCupomCmt>(this.resourceUrl, relatorioCupomCmt, { observe: 'response' });
    }

    update(relatorioCupomCmt: IRelatorioCupomCmt): Observable<EntityResponseType> {
        return this.http.put<IRelatorioCupomCmt>(this.resourceUrl, relatorioCupomCmt, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRelatorioCupomCmt>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRelatorioCupomCmt[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
