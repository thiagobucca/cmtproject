/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { UsuarioportalService } from 'app/entities/usuarioportal/usuarioportal.service';
import { IUsuarioportal, Usuarioportal } from 'app/shared/model/usuarioportal.model';

describe('Service Tests', () => {
    describe('Usuarioportal Service', () => {
        let injector: TestBed;
        let service: UsuarioportalService;
        let httpMock: HttpTestingController;
        let elemDefault: IUsuarioportal;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(UsuarioportalService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Usuarioportal(
                0,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                false,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                currentDate,
                'AAAAAAA',
                currentDate,
                'AAAAAAA',
                currentDate,
                0,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA'
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        createdDate: currentDate.format(DATE_FORMAT),
                        lastModifiedDate: currentDate.format(DATE_FORMAT),
                        dataNascimento: currentDate.format(DATE_FORMAT)
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

            it('should create a Usuarioportal', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        createdDate: currentDate.format(DATE_FORMAT),
                        lastModifiedDate: currentDate.format(DATE_FORMAT),
                        dataNascimento: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        createdDate: currentDate,
                        lastModifiedDate: currentDate,
                        dataNascimento: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Usuarioportal(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Usuarioportal', async () => {
                const returnedFromService = Object.assign(
                    {
                        login: 'BBBBBB',
                        firstName: 'BBBBBB',
                        email: 'BBBBBB',
                        activated: true,
                        langKey: 'BBBBBB',
                        authorities: 'BBBBBB',
                        createdBy: 'BBBBBB',
                        createdDate: currentDate.format(DATE_FORMAT),
                        lastModifiedBy: 'BBBBBB',
                        lastModifiedDate: currentDate.format(DATE_FORMAT),
                        password: 'BBBBBB',
                        dataNascimento: currentDate.format(DATE_FORMAT),
                        lojaMaconicaId: 1,
                        telefone: 'BBBBBB',
                        tipoPessoa: 'BBBBBB',
                        placet: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        createdDate: currentDate,
                        lastModifiedDate: currentDate,
                        dataNascimento: currentDate
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

            it('should return a list of Usuarioportal', async () => {
                const returnedFromService = Object.assign(
                    {
                        login: 'BBBBBB',
                        firstName: 'BBBBBB',
                        email: 'BBBBBB',
                        activated: true,
                        langKey: 'BBBBBB',
                        authorities: 'BBBBBB',
                        createdBy: 'BBBBBB',
                        createdDate: currentDate.format(DATE_FORMAT),
                        lastModifiedBy: 'BBBBBB',
                        lastModifiedDate: currentDate.format(DATE_FORMAT),
                        password: 'BBBBBB',
                        dataNascimento: currentDate.format(DATE_FORMAT),
                        lojaMaconicaId: 1,
                        telefone: 'BBBBBB',
                        tipoPessoa: 'BBBBBB',
                        placet: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        createdDate: currentDate,
                        lastModifiedDate: currentDate,
                        dataNascimento: currentDate
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

            it('should delete a Usuarioportal', async () => {
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
