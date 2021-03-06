/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CmtprojectTestModule } from '../../../test.module';
import { ComunicacaoPushDeleteDialogComponent } from 'app/entities/comunicacao-push/comunicacao-push-delete-dialog.component';
import { ComunicacaoPushService } from 'app/entities/comunicacao-push/comunicacao-push.service';

describe('Component Tests', () => {
    describe('ComunicacaoPush Management Delete Component', () => {
        let comp: ComunicacaoPushDeleteDialogComponent;
        let fixture: ComponentFixture<ComunicacaoPushDeleteDialogComponent>;
        let service: ComunicacaoPushService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [ComunicacaoPushDeleteDialogComponent]
            })
                .overrideTemplate(ComunicacaoPushDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ComunicacaoPushDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComunicacaoPushService);
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
