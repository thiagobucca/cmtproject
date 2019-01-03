import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICupom } from 'app/shared/model/cupom.model';

type EntityResponseType = HttpResponse<ICupom>;
type EntityArrayResponseType = HttpResponse<ICupom[]>;

@Injectable({ providedIn: 'root' })
export class CupomService {
    public resourceUrl = SERVER_API_URL + 'api/cupoms';

    constructor(private http: HttpClient) {}

    create(cupom: ICupom): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(cupom);
        return this.http
            .post<ICupom>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(cupom: ICupom): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(cupom);
        return this.http
            .put<ICupom>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICupom>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICupom[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(cupom: ICupom): ICupom {
        const copy: ICupom = Object.assign({}, cupom, {
            data: cupom.data != null && cupom.data.isValid() ? cupom.data.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.data = res.body.data != null ? moment(res.body.data) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((cupom: ICupom) => {
                cupom.data = cupom.data != null ? moment(cupom.data) : null;
            });
        }
        return res;
    }
}
