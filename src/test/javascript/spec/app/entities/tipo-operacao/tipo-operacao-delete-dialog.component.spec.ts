/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CmtprojectTestModule } from '../../../test.module';
import { TipoOperacaoDeleteDialogComponent } from 'app/entities/tipo-operacao/tipo-operacao-delete-dialog.component';
import { TipoOperacaoService } from 'app/entities/tipo-operacao/tipo-operacao.service';

describe('Component Tests', () => {
    describe('TipoOperacao Management Delete Component', () => {
        let comp: TipoOperacaoDeleteDialogComponent;
        let fixture: ComponentFixture<TipoOperacaoDeleteDialogComponent>;
        let service: TipoOperacaoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [TipoOperacaoDeleteDialogComponent]
            })
                .overrideTemplate(TipoOperacaoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TipoOperacaoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoOperacaoService);
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
