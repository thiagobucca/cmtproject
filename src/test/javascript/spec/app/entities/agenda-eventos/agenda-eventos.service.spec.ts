/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { AgendaEventosService } from 'app/entities/agenda-eventos/agenda-eventos.service';
import { IAgendaEventos, AgendaEventos } from 'app/shared/model/agenda-eventos.model';

describe('Service Tests', () => {
    describe('AgendaEventos Service', () => {
        let injector: TestBed;
        let service: AgendaEventosService;
        let httpMock: HttpTestingController;
        let elemDefault: IAgendaEventos;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(AgendaEventosService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new AgendaEventos(0, 'AAAAAAA', currentDate, 'AAAAAAA', 'AAAAAAA', false, 0);
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

            it('should create a AgendaEventos', async () => {
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
                    .create(new AgendaEventos(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a AgendaEventos', async () => {
                const returnedFromService = Object.assign(
                    {
                        titulo: 'BBBBBB',
                        data: currentDate.format(DATE_TIME_FORMAT),
                        local: 'BBBBBB',
                        descricao: 'BBBBBB',
                        bolAtivo: true,
                        lojaMaconicaId: 1
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

            it('should return a list of AgendaEventos', async () => {
                const returnedFromService = Object.assign(
                    {
                        titulo: 'BBBBBB',
                        data: currentDate.format(DATE_TIME_FORMAT),
                        local: 'BBBBBB',
                        descricao: 'BBBBBB',
                        bolAtivo: true,
                        lojaMaconicaId: 1
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

            it('should delete a AgendaEventos', async () => {
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
