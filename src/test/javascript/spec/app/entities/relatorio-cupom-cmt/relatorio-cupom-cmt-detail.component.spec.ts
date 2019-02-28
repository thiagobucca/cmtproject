/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { RelatorioCupomCmtDetailComponent } from 'app/entities/relatorio-cupom-cmt/relatorio-cupom-cmt-detail.component';
import { RelatorioCupomCmt } from 'app/shared/model/relatorio-cupom-cmt.model';

describe('Component Tests', () => {
    describe('RelatorioCupomCmt Management Detail Component', () => {
        let comp: RelatorioCupomCmtDetailComponent;
        let fixture: ComponentFixture<RelatorioCupomCmtDetailComponent>;
        const route = ({ data: of({ relatorioCupomCmt: new RelatorioCupomCmt(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [RelatorioCupomCmtDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RelatorioCupomCmtDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RelatorioCupomCmtDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.relatorioCupomCmt).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
