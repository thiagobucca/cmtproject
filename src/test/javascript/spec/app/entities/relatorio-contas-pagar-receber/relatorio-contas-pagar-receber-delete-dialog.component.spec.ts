/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CmtprojectTestModule } from '../../../test.module';
import { RelatorioContasPagarReceberDeleteDialogComponent } from 'app/entities/relatorio-contas-pagar-receber/relatorio-contas-pagar-receber-delete-dialog.component';
import { RelatorioContasPagarReceberService } from 'app/entities/relatorio-contas-pagar-receber/relatorio-contas-pagar-receber.service';

describe('Component Tests', () => {
    describe('RelatorioContasPagarReceber Management Delete Component', () => {
        let comp: RelatorioContasPagarReceberDeleteDialogComponent;
        let fixture: ComponentFixture<RelatorioContasPagarReceberDeleteDialogComponent>;
        let service: RelatorioContasPagarReceberService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [RelatorioContasPagarReceberDeleteDialogComponent]
            })
                .overrideTemplate(RelatorioContasPagarReceberDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RelatorioContasPagarReceberDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RelatorioContasPagarReceberService);
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
