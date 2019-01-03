/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmtprojectTestModule } from '../../../test.module';
import { ParametrizacaoComponent } from 'app/entities/parametrizacao/parametrizacao.component';
import { ParametrizacaoService } from 'app/entities/parametrizacao/parametrizacao.service';
import { Parametrizacao } from 'app/shared/model/parametrizacao.model';

describe('Component Tests', () => {
    describe('Parametrizacao Management Component', () => {
        let comp: ParametrizacaoComponent;
        let fixture: ComponentFixture<ParametrizacaoComponent>;
        let service: ParametrizacaoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [ParametrizacaoComponent],
                providers: []
            })
                .overrideTemplate(ParametrizacaoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ParametrizacaoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParametrizacaoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Parametrizacao(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.parametrizacaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
