/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { PessoaService } from 'app/entities/pessoa/pessoa.service';
import { IPessoa, Pessoa, TipoPessoa } from 'app/shared/model/pessoa.model';

describe('Service Tests', () => {
    describe('Pessoa Service', () => {
        let injector: TestBed;
        let service: PessoaService;
        let httpMock: HttpTestingController;
        let elemDefault: IPessoa;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(PessoaService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Pessoa(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', TipoPessoa.Macom, 'AAAAAAA', currentDate, false, 0, 0);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        dataNascimento: currentDate.format(DATE_TIME_FORMAT)
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

            it('should create a Pessoa', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        dataNascimento: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dataNascimento: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Pessoa(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Pessoa', async () => {
                const returnedFromService = Object.assign(
                    {
                        nome: 'BBBBBB',
                        telefone: 'BBBBBB',
                        email: 'BBBBBB',
                        tipoPessoa: 'BBBBBB',
                        senha: 'BBBBBB',
                        dataNascimento: currentDate.format(DATE_TIME_FORMAT),
                        bolAtivo: true,
                        pessoaDependenteId: 1,
                        lojaMaconicaId: 1
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
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

            it('should return a list of Pessoa', async () => {
                const returnedFromService = Object.assign(
                    {
                        nome: 'BBBBBB',
                        telefone: 'BBBBBB',
                        email: 'BBBBBB',
                        tipoPessoa: 'BBBBBB',
                        senha: 'BBBBBB',
                        dataNascimento: currentDate.format(DATE_TIME_FORMAT),
                        bolAtivo: true,
                        pessoaDependenteId: 1,
                        lojaMaconicaId: 1
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
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

            it('should delete a Pessoa', async () => {
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
