/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { RelatoriocupomxcmtUpdateComponent } from 'app/entities/relatoriocupomxcmt/relatoriocupomxcmt-update.component';
import { RelatoriocupomxcmtService } from 'app/entities/relatoriocupomxcmt/relatoriocupomxcmt.service';
import { Relatoriocupomxcmt } from 'app/shared/model/relatoriocupomxcmt.model';

describe('Component Tests', () => {
    describe('Relatoriocupomxcmt Management Update Component', () => {
        let comp: RelatoriocupomxcmtUpdateComponent;
        let fixture: ComponentFixture<RelatoriocupomxcmtUpdateComponent>;
        let service: RelatoriocupomxcmtService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [RelatoriocupomxcmtUpdateComponent]
            })
                .overrideTemplate(RelatoriocupomxcmtUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RelatoriocupomxcmtUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RelatoriocupomxcmtService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Relatoriocupomxcmt(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.relatoriocupomxcmt = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Relatoriocupomxcmt();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.relatoriocupomxcmt = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
