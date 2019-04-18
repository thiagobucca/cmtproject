/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CmtprojectTestModule } from '../../../test.module';
import { GrupoComercialDeleteDialogComponent } from 'app/entities/grupo-comercial/grupo-comercial-delete-dialog.component';
import { GrupoComercialService } from 'app/entities/grupo-comercial/grupo-comercial.service';

describe('Component Tests', () => {
    describe('GrupoComercial Management Delete Component', () => {
        let comp: GrupoComercialDeleteDialogComponent;
        let fixture: ComponentFixture<GrupoComercialDeleteDialogComponent>;
        let service: GrupoComercialService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [GrupoComercialDeleteDialogComponent]
            })
                .overrideTemplate(GrupoComercialDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GrupoComercialDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GrupoComercialService);
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
