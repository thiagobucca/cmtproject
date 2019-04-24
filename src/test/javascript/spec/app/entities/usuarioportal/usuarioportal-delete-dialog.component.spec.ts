/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CmtprojectTestModule } from '../../../test.module';
import { UsuarioportalDeleteDialogComponent } from 'app/entities/usuarioportal/usuarioportal-delete-dialog.component';
import { UsuarioportalService } from 'app/entities/usuarioportal/usuarioportal.service';

describe('Component Tests', () => {
    describe('Usuarioportal Management Delete Component', () => {
        let comp: UsuarioportalDeleteDialogComponent;
        let fixture: ComponentFixture<UsuarioportalDeleteDialogComponent>;
        let service: UsuarioportalService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [UsuarioportalDeleteDialogComponent]
            })
                .overrideTemplate(UsuarioportalDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UsuarioportalDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsuarioportalService);
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
