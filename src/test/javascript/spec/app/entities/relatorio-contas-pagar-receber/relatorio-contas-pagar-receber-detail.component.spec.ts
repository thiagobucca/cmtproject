/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { RelatorioContasPagarReceberDetailComponent } from 'app/entities/relatorio-contas-pagar-receber/relatorio-contas-pagar-receber-detail.component';
import { RelatorioContasPagarReceber } from 'app/shared/model/relatorio-contas-pagar-receber.model';

describe('Component Tests', () => {
    describe('RelatorioContasPagarReceber Management Detail Component', () => {
        let comp: RelatorioContasPagarReceberDetailComponent;
        let fixture: ComponentFixture<RelatorioContasPagarReceberDetailComponent>;
        const route = ({ data: of({ relatorioContasPagarReceber: new RelatorioContasPagarReceber(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [RelatorioContasPagarReceberDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RelatorioContasPagarReceberDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RelatorioContasPagarReceberDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.relatorioContasPagarReceber).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
