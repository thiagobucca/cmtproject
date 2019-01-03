/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { EstabelecimentoComercialDetailComponent } from 'app/entities/estabelecimento-comercial/estabelecimento-comercial-detail.component';
import { EstabelecimentoComercial } from 'app/shared/model/estabelecimento-comercial.model';

describe('Component Tests', () => {
    describe('EstabelecimentoComercial Management Detail Component', () => {
        let comp: EstabelecimentoComercialDetailComponent;
        let fixture: ComponentFixture<EstabelecimentoComercialDetailComponent>;
        const route = ({ data: of({ estabelecimentoComercial: new EstabelecimentoComercial(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [EstabelecimentoComercialDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EstabelecimentoComercialDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EstabelecimentoComercialDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.estabelecimentoComercial).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
