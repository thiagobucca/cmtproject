/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CmtprojectTestModule } from '../../../test.module';
import { RelatoriocupomxcmtDeleteDialogComponent } from 'app/entities/relatoriocupomxcmt/relatoriocupomxcmt-delete-dialog.component';
import { RelatoriocupomxcmtService } from 'app/entities/relatoriocupomxcmt/relatoriocupomxcmt.service';

describe('Component Tests', () => {
    describe('Relatoriocupomxcmt Management Delete Component', () => {
        let comp: RelatoriocupomxcmtDeleteDialogComponent;
        let fixture: ComponentFixture<RelatoriocupomxcmtDeleteDialogComponent>;
        let service: RelatoriocupomxcmtService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [RelatoriocupomxcmtDeleteDialogComponent]
            })
                .overrideTemplate(RelatoriocupomxcmtDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RelatoriocupomxcmtDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RelatoriocupomxcmtService);
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
