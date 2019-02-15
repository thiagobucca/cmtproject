import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILojaMaconica } from 'app/shared/model/loja-maconica.model';

type EntityResponseType = HttpResponse<ILojaMaconica>;
type EntityArrayResponseType = HttpResponse<ILojaMaconica[]>;

@Injectable({ providedIn: 'root' })
export class LojaMaconicaService {
    public resourceUrl = SERVER_API_URL + 'api/loja-maconicas';

    constructor(private http: HttpClient) {}

    create(lojaMaconica: ILojaMaconica): Observable<EntityResponseType> {
        return this.http.post<ILojaMaconica>(this.resourceUrl, lojaMaconica, { observe: 'response' });
    }

    update(lojaMaconica: ILojaMaconica): Observable<EntityResponseType> {
        return this.http.put<ILojaMaconica>(this.resourceUrl, lojaMaconica, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ILojaMaconica>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    findByStatus(status: boolean): Observable<EntityArrayResponseType> {
        return this.http.get<ILojaMaconica[]>(`${this.resourceUrl}/status/${status}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILojaMaconica[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
