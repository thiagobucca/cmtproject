/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmtprojectTestModule } from '../../../test.module';
import { AgendaEventosComponent } from 'app/entities/agenda-eventos/agenda-eventos.component';
import { AgendaEventosService } from 'app/entities/agenda-eventos/agenda-eventos.service';
import { AgendaEventos } from 'app/shared/model/agenda-eventos.model';

describe('Component Tests', () => {
    describe('AgendaEventos Management Component', () => {
        let comp: AgendaEventosComponent;
        let fixture: ComponentFixture<AgendaEventosComponent>;
        let service: AgendaEventosService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [AgendaEventosComponent],
                providers: []
            })
                .overrideTemplate(AgendaEventosComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AgendaEventosComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgendaEventosService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AgendaEventos(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.agendaEventos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
