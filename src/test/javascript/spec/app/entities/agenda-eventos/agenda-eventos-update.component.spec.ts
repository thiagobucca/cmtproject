/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { AgendaEventosUpdateComponent } from 'app/entities/agenda-eventos/agenda-eventos-update.component';
import { AgendaEventosService } from 'app/entities/agenda-eventos/agenda-eventos.service';
import { AgendaEventos } from 'app/shared/model/agenda-eventos.model';

describe('Component Tests', () => {
    describe('AgendaEventos Management Update Component', () => {
        let comp: AgendaEventosUpdateComponent;
        let fixture: ComponentFixture<AgendaEventosUpdateComponent>;
        let service: AgendaEventosService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [AgendaEventosUpdateComponent]
            })
                .overrideTemplate(AgendaEventosUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AgendaEventosUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgendaEventosService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AgendaEventos(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.agendaEventos = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AgendaEventos();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.agendaEventos = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
