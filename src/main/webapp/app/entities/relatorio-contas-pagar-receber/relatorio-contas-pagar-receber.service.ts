import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRelatorioContasPagarReceber } from 'app/shared/model/relatorio-contas-pagar-receber.model';

type EntityResponseType = HttpResponse<IRelatorioContasPagarReceber>;
type EntityArrayResponseType = HttpResponse<IRelatorioContasPagarReceber[]>;

@Injectable({ providedIn: 'root' })
export class RelatorioContasPagarReceberService {
    public resourceUrl = SERVER_API_URL + 'api/relatorio-contas-pagar-recebers';

    constructor(private http: HttpClient) {}

    create(relatorioContasPagarReceber: IRelatorioContasPagarReceber): Observable<EntityResponseType> {
        return this.http.post<IRelatorioContasPagarReceber>(this.resourceUrl, relatorioContasPagarReceber, { observe: 'response' });
    }

    update(relatorioContasPagarReceber: IRelatorioContasPagarReceber): Observable<EntityResponseType> {
        return this.http.put<IRelatorioContasPagarReceber>(this.resourceUrl, relatorioContasPagarReceber, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRelatorioContasPagarReceber>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRelatorioContasPagarReceber[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
