/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CmtprojectTestModule } from '../../../test.module';
import { RelatoriocontapagarreceberDeleteDialogComponent } from 'app/entities/relatoriocontapagarreceber/relatoriocontapagarreceber-delete-dialog.component';
import { RelatoriocontapagarreceberService } from 'app/entities/relatoriocontapagarreceber/relatoriocontapagarreceber.service';

describe('Component Tests', () => {
    describe('Relatoriocontapagarreceber Management Delete Component', () => {
        let comp: RelatoriocontapagarreceberDeleteDialogComponent;
        let fixture: ComponentFixture<RelatoriocontapagarreceberDeleteDialogComponent>;
        let service: RelatoriocontapagarreceberService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [RelatoriocontapagarreceberDeleteDialogComponent]
            })
                .overrideTemplate(RelatoriocontapagarreceberDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RelatoriocontapagarreceberDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RelatoriocontapagarreceberService);
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
