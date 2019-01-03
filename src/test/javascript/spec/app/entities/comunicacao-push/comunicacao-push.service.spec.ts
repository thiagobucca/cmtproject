/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { ComunicacaoPushService } from 'app/entities/comunicacao-push/comunicacao-push.service';
import { IComunicacaoPush, ComunicacaoPush, TipoPessoa } from 'app/shared/model/comunicacao-push.model';

describe('Service Tests', () => {
    describe('ComunicacaoPush Service', () => {
        let injector: TestBed;
        let service: ComunicacaoPushService;
        let httpMock: HttpTestingController;
        let elemDefault: IComunicacaoPush;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(ComunicacaoPushService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new ComunicacaoPush(0, 'AAAAAAA', 'AAAAAAA', TipoPessoa.Macom);
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

            it('should create a ComunicacaoPush', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new ComunicacaoPush(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a ComunicacaoPush', async () => {
                const returnedFromService = Object.assign(
                    {
                        titulo: 'BBBBBB',
                        conteudoPush: 'BBBBBB',
                        tipoPessoa: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of ComunicacaoPush', async () => {
                const returnedFromService = Object.assign(
                    {
                        titulo: 'BBBBBB',
                        conteudoPush: 'BBBBBB',
                        tipoPessoa: 'BBBBBB'
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

            it('should delete a ComunicacaoPush', async () => {
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
