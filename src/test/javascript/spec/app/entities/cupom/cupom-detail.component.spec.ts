/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { CupomDetailComponent } from 'app/entities/cupom/cupom-detail.component';
import { Cupom } from 'app/shared/model/cupom.model';

describe('Component Tests', () => {
    describe('Cupom Management Detail Component', () => {
        let comp: CupomDetailComponent;
        let fixture: ComponentFixture<CupomDetailComponent>;
        const route = ({ data: of({ cupom: new Cupom(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [CupomDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CupomDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CupomDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.cupom).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
