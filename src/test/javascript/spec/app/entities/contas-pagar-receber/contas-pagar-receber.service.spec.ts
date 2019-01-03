/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ContasPagarReceberService } from 'app/entities/contas-pagar-receber/contas-pagar-receber.service';
import { IContasPagarReceber, ContasPagarReceber, TipoLancamento, StatusLancamento } from 'app/shared/model/contas-pagar-receber.model';

describe('Service Tests', () => {
    describe('ContasPagarReceber Service', () => {
        let injector: TestBed;
        let service: ContasPagarReceberService;
        let httpMock: HttpTestingController;
        let elemDefault: IContasPagarReceber;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(ContasPagarReceberService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new ContasPagarReceber(0, currentDate, 0, TipoLancamento.Credito, StatusLancamento.Aberto);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        data: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a ContasPagarReceber', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        data: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        data: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new ContasPagarReceber(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a ContasPagarReceber', async () => {
                const returnedFromService = Object.assign(
                    {
                        data: currentDate.format(DATE_TIME_FORMAT),
                        valor: 1,
                        tipoLancamento: 'BBBBBB',
                        statusLancamento: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        data: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of ContasPagarReceber', async () => {
                const returnedFromService = Object.assign(
                    {
                        data: currentDate.format(DATE_TIME_FORMAT),
                        valor: 1,
                        tipoLancamento: 'BBBBBB',
                        statusLancamento: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        data: currentDate
                    },
                    returnedFromService
                );
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

            it('should delete a ContasPagarReceber', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
