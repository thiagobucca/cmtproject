/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { TipoOperacaoDetailComponent } from 'app/entities/tipo-operacao/tipo-operacao-detail.component';
import { TipoOperacao } from 'app/shared/model/tipo-operacao.model';

describe('Component Tests', () => {
    describe('TipoOperacao Management Detail Component', () => {
        let comp: TipoOperacaoDetailComponent;
        let fixture: ComponentFixture<TipoOperacaoDetailComponent>;
        const route = ({ data: of({ tipoOperacao: new TipoOperacao(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [TipoOperacaoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TipoOperacaoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TipoOperacaoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.tipoOperacao).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
