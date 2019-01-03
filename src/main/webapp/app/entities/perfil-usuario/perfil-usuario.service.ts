import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPerfilUsuario } from 'app/shared/model/perfil-usuario.model';

type EntityResponseType = HttpResponse<IPerfilUsuario>;
type EntityArrayResponseType = HttpResponse<IPerfilUsuario[]>;

@Injectable({ providedIn: 'root' })
export class PerfilUsuarioService {
    public resourceUrl = SERVER_API_URL + 'api/perfil-usuarios';

    constructor(private http: HttpClient) {}

    create(perfilUsuario: IPerfilUsuario): Observable<EntityResponseType> {
        return this.http.post<IPerfilUsuario>(this.resourceUrl, perfilUsuario, { observe: 'response' });
    }

    update(perfilUsuario: IPerfilUsuario): Observable<EntityResponseType> {
        return this.http.put<IPerfilUsuario>(this.resourceUrl, perfilUsuario, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPerfilUsuario>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPerfilUsuario[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
