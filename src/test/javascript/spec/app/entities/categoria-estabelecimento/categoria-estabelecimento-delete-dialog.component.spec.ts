/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CmtprojectTestModule } from '../../../test.module';
import { CategoriaEstabelecimentoDeleteDialogComponent } from 'app/entities/categoria-estabelecimento/categoria-estabelecimento-delete-dialog.component';
import { CategoriaEstabelecimentoService } from 'app/entities/categoria-estabelecimento/categoria-estabelecimento.service';

describe('Component Tests', () => {
    describe('CategoriaEstabelecimento Management Delete Component', () => {
        let comp: CategoriaEstabelecimentoDeleteDialogComponent;
        let fixture: ComponentFixture<CategoriaEstabelecimentoDeleteDialogComponent>;
        let service: CategoriaEstabelecimentoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [CategoriaEstabelecimentoDeleteDialogComponent]
            })
                .overrideTemplate(CategoriaEstabelecimentoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CategoriaEstabelecimentoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoriaEstabelecimentoService);
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
