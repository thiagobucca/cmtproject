/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CmtprojectTestModule } from '../../../test.module';
import { PerfilUsuarioDeleteDialogComponent } from 'app/entities/perfil-usuario/perfil-usuario-delete-dialog.component';
import { PerfilUsuarioService } from 'app/entities/perfil-usuario/perfil-usuario.service';

describe('Component Tests', () => {
    describe('PerfilUsuario Management Delete Component', () => {
        let comp: PerfilUsuarioDeleteDialogComponent;
        let fixture: ComponentFixture<PerfilUsuarioDeleteDialogComponent>;
        let service: PerfilUsuarioService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [PerfilUsuarioDeleteDialogComponent]
            })
                .overrideTemplate(PerfilUsuarioDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PerfilUsuarioDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerfilUsuarioService);
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
