/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { CupomUpdateComponent } from 'app/entities/cupom/cupom-update.component';
import { CupomService } from 'app/entities/cupom/cupom.service';
import { Cupom } from 'app/shared/model/cupom.model';

describe('Component Tests', () => {
    describe('Cupom Management Update Component', () => {
        let comp: CupomUpdateComponent;
        let fixture: ComponentFixture<CupomUpdateComponent>;
        let service: CupomService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [CupomUpdateComponent]
            })
                .overrideTemplate(CupomUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CupomUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CupomService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Cupom(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.cupom = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Cupom();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.cupom = entity;
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
