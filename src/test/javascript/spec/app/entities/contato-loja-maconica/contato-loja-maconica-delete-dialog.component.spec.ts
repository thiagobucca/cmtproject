/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CmtprojectTestModule } from '../../../test.module';
import { ContatoLojaMaconicaDeleteDialogComponent } from 'app/entities/contato-loja-maconica/contato-loja-maconica-delete-dialog.component';
import { ContatoLojaMaconicaService } from 'app/entities/contato-loja-maconica/contato-loja-maconica.service';

describe('Component Tests', () => {
    describe('ContatoLojaMaconica Management Delete Component', () => {
        let comp: ContatoLojaMaconicaDeleteDialogComponent;
        let fixture: ComponentFixture<ContatoLojaMaconicaDeleteDialogComponent>;
        let service: ContatoLojaMaconicaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [ContatoLojaMaconicaDeleteDialogComponent]
            })
                .overrideTemplate(ContatoLojaMaconicaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ContatoLojaMaconicaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContatoLojaMaconicaService);
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
