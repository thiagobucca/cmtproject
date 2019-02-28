/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CmtprojectTestModule } from '../../../test.module';
import { RelatorioCupomCmtDeleteDialogComponent } from 'app/entities/relatorio-cupom-cmt/relatorio-cupom-cmt-delete-dialog.component';
import { RelatorioCupomCmtService } from 'app/entities/relatorio-cupom-cmt/relatorio-cupom-cmt.service';

describe('Component Tests', () => {
    describe('RelatorioCupomCmt Management Delete Component', () => {
        let comp: RelatorioCupomCmtDeleteDialogComponent;
        let fixture: ComponentFixture<RelatorioCupomCmtDeleteDialogComponent>;
        let service: RelatorioCupomCmtService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [RelatorioCupomCmtDeleteDialogComponent]
            })
                .overrideTemplate(RelatorioCupomCmtDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RelatorioCupomCmtDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RelatorioCupomCmtService);
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
