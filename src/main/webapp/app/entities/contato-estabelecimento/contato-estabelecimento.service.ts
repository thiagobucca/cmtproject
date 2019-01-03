import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IContatoEstabelecimento } from 'app/shared/model/contato-estabelecimento.model';

type EntityResponseType = HttpResponse<IContatoEstabelecimento>;
type EntityArrayResponseType = HttpResponse<IContatoEstabelecimento[]>;

@Injectable({ providedIn: 'root' })
export class ContatoEstabelecimentoService {
    public resourceUrl = SERVER_API_URL + 'api/contato-estabelecimentos';

    constructor(private http: HttpClient) {}

    create(contatoEstabelecimento: IContatoEstabelecimento): Observable<EntityResponseType> {
        return this.http.post<IContatoEstabelecimento>(this.resourceUrl, contatoEstabelecimento, { observe: 'response' });
    }

    update(contatoEstabelecimento: IContatoEstabelecimento): Observable<EntityResponseType> {
        return this.http.put<IContatoEstabelecimento>(this.resourceUrl, contatoEstabelecimento, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IContatoEstabelecimento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IContatoEstabelecimento[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
