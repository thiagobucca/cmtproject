/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmtprojectTestModule } from '../../../test.module';
import { ComunicacaoPushLojaComponent } from 'app/entities/comunicacao-push-loja/comunicacao-push-loja.component';
import { ComunicacaoPushLojaService } from 'app/entities/comunicacao-push-loja/comunicacao-push-loja.service';
import { ComunicacaoPushLoja } from 'app/shared/model/comunicacao-push-loja.model';

describe('Component Tests', () => {
    describe('ComunicacaoPushLoja Management Component', () => {
        let comp: ComunicacaoPushLojaComponent;
        let fixture: ComponentFixture<ComunicacaoPushLojaComponent>;
        let service: ComunicacaoPushLojaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [ComunicacaoPushLojaComponent],
                providers: []
            })
                .overrideTemplate(ComunicacaoPushLojaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ComunicacaoPushLojaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComunicacaoPushLojaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ComunicacaoPushLoja(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.comunicacaoPushLojas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
