/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { LojaMaconicaDetailComponent } from 'app/entities/loja-maconica/loja-maconica-detail.component';
import { LojaMaconica } from 'app/shared/model/loja-maconica.model';

describe('Component Tests', () => {
    describe('LojaMaconica Management Detail Component', () => {
        let comp: LojaMaconicaDetailComponent;
        let fixture: ComponentFixture<LojaMaconicaDetailComponent>;
        const route = ({ data: of({ lojaMaconica: new LojaMaconica(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [LojaMaconicaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LojaMaconicaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LojaMaconicaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.lojaMaconica).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
