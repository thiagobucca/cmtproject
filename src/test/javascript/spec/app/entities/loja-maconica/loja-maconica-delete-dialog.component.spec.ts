/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CmtprojectTestModule } from '../../../test.module';
import { LojaMaconicaDeleteDialogComponent } from 'app/entities/loja-maconica/loja-maconica-delete-dialog.component';
import { LojaMaconicaService } from 'app/entities/loja-maconica/loja-maconica.service';

describe('Component Tests', () => {
    describe('LojaMaconica Management Delete Component', () => {
        let comp: LojaMaconicaDeleteDialogComponent;
        let fixture: ComponentFixture<LojaMaconicaDeleteDialogComponent>;
        let service: LojaMaconicaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [LojaMaconicaDeleteDialogComponent]
            })
                .overrideTemplate(LojaMaconicaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LojaMaconicaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LojaMaconicaService);
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
