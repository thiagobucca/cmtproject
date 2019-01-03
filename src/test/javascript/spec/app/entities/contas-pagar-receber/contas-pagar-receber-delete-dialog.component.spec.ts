/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CmtprojectTestModule } from '../../../test.module';
import { ContasPagarReceberDeleteDialogComponent } from 'app/entities/contas-pagar-receber/contas-pagar-receber-delete-dialog.component';
import { ContasPagarReceberService } from 'app/entities/contas-pagar-receber/contas-pagar-receber.service';

describe('Component Tests', () => {
    describe('ContasPagarReceber Management Delete Component', () => {
        let comp: ContasPagarReceberDeleteDialogComponent;
        let fixture: ComponentFixture<ContasPagarReceberDeleteDialogComponent>;
        let service: ContasPagarReceberService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [ContasPagarReceberDeleteDialogComponent]
            })
                .overrideTemplate(ContasPagarReceberDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ContasPagarReceberDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContasPagarReceberService);
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
