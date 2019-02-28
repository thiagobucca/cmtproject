/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { UsuarioportalUpdateComponent } from 'app/entities/usuarioportal/usuarioportal-update.component';
import { UsuarioportalService } from 'app/entities/usuarioportal/usuarioportal.service';
import { UsuarioPortal } from 'app/shared/model/usuarioportal.model';

describe('Component Tests', () => {
    describe('Usuarioportal Management Update Component', () => {
        let comp: UsuarioportalUpdateComponent;
        let fixture: ComponentFixture<UsuarioportalUpdateComponent>;
        let service: UsuarioportalService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [UsuarioportalUpdateComponent]
            })
                .overrideTemplate(UsuarioportalUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UsuarioportalUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsuarioportalService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new UsuarioPortal(123);
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
                const entity = new UsuarioPortal();
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
