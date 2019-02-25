/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { RelatoriocupomxcmtDetailComponent } from 'app/entities/relatoriocupomxcmt/relatoriocupomxcmt-detail.component';
import { Relatoriocupomxcmt } from 'app/shared/model/relatoriocupomxcmt.model';

describe('Component Tests', () => {
    describe('Relatoriocupomxcmt Management Detail Component', () => {
        let comp: RelatoriocupomxcmtDetailComponent;
        let fixture: ComponentFixture<RelatoriocupomxcmtDetailComponent>;
        const route = ({ data: of({ relatoriocupomxcmt: new Relatoriocupomxcmt(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [RelatoriocupomxcmtDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RelatoriocupomxcmtDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RelatoriocupomxcmtDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.relatoriocupomxcmt).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
