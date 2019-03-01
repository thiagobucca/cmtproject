/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { RelatorioCupomCmtService } from 'app/entities/relatorio-cupom-cmt/relatorio-cupom-cmt.service';
import { IRelatorioCupomCmt, RelatorioCupomCmt } from 'app/shared/model/relatorio-cupom-cmt.model';

describe('Service Tests', () => {
    describe('RelatorioCupomCmt Service', () => {
        let injector: TestBed;
        let service: RelatorioCupomCmtService;
        let httpMock: HttpTestingController;
        let elemDefault: IRelatorioCupomCmt;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(RelatorioCupomCmtService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new RelatorioCupomCmt(0, 'AAAAAAA', currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of RelatorioCupomCmt', async () => {
                const returnedFromService = Object.assign(
                    {
                        cupom: 'BBBBBB',
                        data: 1
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
