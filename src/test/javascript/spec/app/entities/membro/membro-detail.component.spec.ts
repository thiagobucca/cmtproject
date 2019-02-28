/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { MembroDetailComponent } from 'app/entities/membro/membro-detail.component';
import { Membro } from 'app/shared/model/membro.model';

describe('Component Tests', () => {
    describe('Membro Management Detail Component', () => {
        let comp: MembroDetailComponent;
        let fixture: ComponentFixture<MembroDetailComponent>;
        const route = ({ data: of({ membro: new Membro(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [MembroDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MembroDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MembroDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.membro).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
