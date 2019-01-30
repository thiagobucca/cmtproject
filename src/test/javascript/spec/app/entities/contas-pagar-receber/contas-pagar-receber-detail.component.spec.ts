/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { ContasPagarReceberDetailComponent } from 'app/entities/contas-pagar-receber/contas-pagar-receber-detail.component';
import { ContasPagarReceber } from 'app/shared/model/contas-pagar-receber.model';

describe('Component Tests', () => {
    describe('ContasPagarReceber Management Detail Component', () => {
        let comp: ContasPagarReceberDetailComponent;
        let fixture: ComponentFixture<ContasPagarReceberDetailComponent>;
        const route = ({ data: of({ contasPagarReceber: new ContasPagarReceber(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [ContasPagarReceberDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ContasPagarReceberDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ContasPagarReceberDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.contasPagarReceber).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
