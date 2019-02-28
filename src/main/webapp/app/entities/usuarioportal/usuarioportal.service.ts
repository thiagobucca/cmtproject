import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUsuarioportal } from 'app/shared/model/usuarioportal.model';

type EntityResponseType = HttpResponse<IUsuarioportal>;
type EntityArrayResponseType = HttpResponse<IUsuarioportal[]>;

@Injectable({ providedIn: 'root' })
export class UsuarioportalService {
    public resourceUrl = SERVER_API_URL + 'api/usuarioportals';

    constructor(private http: HttpClient) {}

    create(usuarioportal: IUsuarioportal): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(usuarioportal);
        return this.http
            .post<IUsuarioportal>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(usuarioportal: IUsuarioportal): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(usuarioportal);
        return this.http
            .put<IUsuarioportal>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IUsuarioportal>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IUsuarioportal[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(usuarioportal: IUsuarioportal): IUsuarioportal {
        const copy: IUsuarioportal = Object.assign({}, usuarioportal, {
            createdDate:
                usuarioportal.createdDate != null && usuarioportal.createdDate.isValid()
                    ? usuarioportal.createdDate.format(DATE_FORMAT)
                    : null,
            lastModifiedDate:
                usuarioportal.lastModifiedDate != null && usuarioportal.lastModifiedDate.isValid()
                    ? usuarioportal.lastModifiedDate.format(DATE_FORMAT)
                    : null,
            dataNascimento:
                usuarioportal.dataNascimento != null && usuarioportal.dataNascimento.isValid()
                    ? usuarioportal.dataNascimento.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
            res.body.lastModifiedDate = res.body.lastModifiedDate != null ? moment(res.body.lastModifiedDate) : null;
            res.body.dataNascimento = res.body.dataNascimento != null ? moment(res.body.dataNascimento) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((usuarioportal: IUsuarioportal) => {
                usuarioportal.createdDate = usuarioportal.createdDate != null ? moment(usuarioportal.createdDate) : null;
                usuarioportal.lastModifiedDate = usuarioportal.lastModifiedDate != null ? moment(usuarioportal.lastModifiedDate) : null;
                usuarioportal.dataNascimento = usuarioportal.dataNascimento != null ? moment(usuarioportal.dataNascimento) : null;
            });
        }
        return res;
    }
}
