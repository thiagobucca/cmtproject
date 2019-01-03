/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CmtprojectTestModule } from '../../../test.module';
import { AgendaEventosDeleteDialogComponent } from 'app/entities/agenda-eventos/agenda-eventos-delete-dialog.component';
import { AgendaEventosService } from 'app/entities/agenda-eventos/agenda-eventos.service';

describe('Component Tests', () => {
    describe('AgendaEventos Management Delete Component', () => {
        let comp: AgendaEventosDeleteDialogComponent;
        let fixture: ComponentFixture<AgendaEventosDeleteDialogComponent>;
        let service: AgendaEventosService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [AgendaEventosDeleteDialogComponent]
            })
                .overrideTemplate(AgendaEventosDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AgendaEventosDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgendaEventosService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
