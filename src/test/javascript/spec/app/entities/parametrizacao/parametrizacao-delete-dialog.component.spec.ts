/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CmtprojectTestModule } from '../../../test.module';
import { ParametrizacaoDeleteDialogComponent } from 'app/entities/parametrizacao/parametrizacao-delete-dialog.component';
import { ParametrizacaoService } from 'app/entities/parametrizacao/parametrizacao.service';

describe('Component Tests', () => {
    describe('Parametrizacao Management Delete Component', () => {
        let comp: ParametrizacaoDeleteDialogComponent;
        let fixture: ComponentFixture<ParametrizacaoDeleteDialogComponent>;
        let service: ParametrizacaoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [ParametrizacaoDeleteDialogComponent]
            })
                .overrideTemplate(ParametrizacaoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ParametrizacaoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParametrizacaoService);
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
