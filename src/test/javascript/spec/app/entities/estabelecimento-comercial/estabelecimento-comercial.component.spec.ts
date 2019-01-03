/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmtprojectTestModule } from '../../../test.module';
import { EstabelecimentoComercialComponent } from 'app/entities/estabelecimento-comercial/estabelecimento-comercial.component';
import { EstabelecimentoComercialService } from 'app/entities/estabelecimento-comercial/estabelecimento-comercial.service';
import { EstabelecimentoComercial } from 'app/shared/model/estabelecimento-comercial.model';

describe('Component Tests', () => {
    describe('EstabelecimentoComercial Management Component', () => {
        let comp: EstabelecimentoComercialComponent;
        let fixture: ComponentFixture<EstabelecimentoComercialComponent>;
        let service: EstabelecimentoComercialService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [EstabelecimentoComercialComponent],
                providers: []
            })
                .overrideTemplate(EstabelecimentoComercialComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EstabelecimentoComercialComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstabelecimentoComercialService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new EstabelecimentoComercial(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.estabelecimentoComercials[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
