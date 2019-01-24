/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CmtprojectTestModule } from '../../../test.module';
import { ComunicacaoPushLojaDeleteDialogComponent } from 'app/entities/comunicacao-push-loja/comunicacao-push-loja-delete-dialog.component';
import { ComunicacaoPushLojaService } from 'app/entities/comunicacao-push-loja/comunicacao-push-loja.service';

describe('Component Tests', () => {
    describe('ComunicacaoPushLoja Management Delete Component', () => {
        let comp: ComunicacaoPushLojaDeleteDialogComponent;
        let fixture: ComponentFixture<ComunicacaoPushLojaDeleteDialogComponent>;
        let service: ComunicacaoPushLojaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [ComunicacaoPushLojaDeleteDialogComponent]
            })
                .overrideTemplate(ComunicacaoPushLojaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ComunicacaoPushLojaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComunicacaoPushLojaService);
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
