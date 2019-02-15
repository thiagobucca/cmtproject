import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IContatoLojaMaconica } from 'app/shared/model/contato-loja-maconica.model';

type EntityResponseType = HttpResponse<IContatoLojaMaconica>;
type EntityArrayResponseType = HttpResponse<IContatoLojaMaconica[]>;

@Injectable({ providedIn: 'root' })
export class ContatoLojaMaconicaService {
    public resourceUrl = SERVER_API_URL + 'api/contato-loja-maconicas';

    constructor(private http: HttpClient) {}

    create(contatoLojaMaconica: IContatoLojaMaconica): Observable<EntityResponseType> {
        return this.http.post<IContatoLojaMaconica>(this.resourceUrl, contatoLojaMaconica, { observe: 'response' });
    }

    update(contatoLojaMaconica: IContatoLojaMaconica): Observable<EntityResponseType> {
        return this.http.put<IContatoLojaMaconica>(this.resourceUrl, contatoLojaMaconica, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IContatoLojaMaconica>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    findByLoja(id: number): Observable<EntityArrayResponseType> {
        return this.http.get<IContatoLojaMaconica[]>(`${this.resourceUrl}/lojamaconica/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IContatoLojaMaconica[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
