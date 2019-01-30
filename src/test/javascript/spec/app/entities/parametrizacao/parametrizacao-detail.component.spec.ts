/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { ParametrizacaoDetailComponent } from 'app/entities/parametrizacao/parametrizacao-detail.component';
import { Parametrizacao } from 'app/shared/model/parametrizacao.model';

describe('Component Tests', () => {
    describe('Parametrizacao Management Detail Component', () => {
        let comp: ParametrizacaoDetailComponent;
        let fixture: ComponentFixture<ParametrizacaoDetailComponent>;
        const route = ({ data: of({ parametrizacao: new Parametrizacao(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [ParametrizacaoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ParametrizacaoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ParametrizacaoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.parametrizacao).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
