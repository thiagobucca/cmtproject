import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRelatoriocontapagarreceber } from 'app/shared/model/relatoriocontapagarreceber.model';

type EntityResponseType = HttpResponse<IRelatoriocontapagarreceber>;
type EntityArrayResponseType = HttpResponse<IRelatoriocontapagarreceber[]>;

@Injectable({ providedIn: 'root' })
export class RelatoriocontapagarreceberService {
    public resourceUrl = SERVER_API_URL + 'api/relatoriocontapagarrecebers';

    constructor(private http: HttpClient) {}

    create(relatoriocontapagarreceber: IRelatoriocontapagarreceber): Observable<EntityResponseType> {
        return this.http.post<IRelatoriocontapagarreceber>(this.resourceUrl, relatoriocontapagarreceber, { observe: 'response' });
    }

    update(relatoriocontapagarreceber: IRelatoriocontapagarreceber): Observable<EntityResponseType> {
        return this.http.put<IRelatoriocontapagarreceber>(this.resourceUrl, relatoriocontapagarreceber, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRelatoriocontapagarreceber>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRelatoriocontapagarreceber[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
