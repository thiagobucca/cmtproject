/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { AgendaEventosDetailComponent } from 'app/entities/agenda-eventos/agenda-eventos-detail.component';
import { AgendaEventos } from 'app/shared/model/agenda-eventos.model';

describe('Component Tests', () => {
    describe('AgendaEventos Management Detail Component', () => {
        let comp: AgendaEventosDetailComponent;
        let fixture: ComponentFixture<AgendaEventosDetailComponent>;
        const route = ({ data: of({ agendaEventos: new AgendaEventos(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [AgendaEventosDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AgendaEventosDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AgendaEventosDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.agendaEventos).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
