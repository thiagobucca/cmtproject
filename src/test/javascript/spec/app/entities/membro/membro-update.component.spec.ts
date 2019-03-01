/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { MembroUpdateComponent } from 'app/entities/membro/membro-update.component';
import { MembroService } from 'app/entities/membro/membro.service';
import { Membro } from 'app/shared/model/membro.model';

describe('Component Tests', () => {
    describe('Membro Management Update Component', () => {
        let comp: MembroUpdateComponent;
        let fixture: ComponentFixture<MembroUpdateComponent>;
        let service: MembroService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [MembroUpdateComponent]
            })
                .overrideTemplate(MembroUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MembroUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MembroService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Membro(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.user = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Membro();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.user = entity;
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
