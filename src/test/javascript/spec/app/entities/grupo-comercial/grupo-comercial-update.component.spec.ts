/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { GrupoComercialUpdateComponent } from 'app/entities/grupo-comercial/grupo-comercial-update.component';
import { GrupoComercialService } from 'app/entities/grupo-comercial/grupo-comercial.service';
import { GrupoComercial } from 'app/shared/model/grupo-comercial.model';

describe('Component Tests', () => {
    describe('GrupoComercial Management Update Component', () => {
        let comp: GrupoComercialUpdateComponent;
        let fixture: ComponentFixture<GrupoComercialUpdateComponent>;
        let service: GrupoComercialService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [GrupoComercialUpdateComponent]
            })
                .overrideTemplate(GrupoComercialUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GrupoComercialUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GrupoComercialService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GrupoComercial(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.grupoComercial = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GrupoComercial();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.grupoComercial = entity;
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
