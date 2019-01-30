/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CmtprojectTestModule } from '../../../test.module';
import { ContatoEstabelecimentoDeleteDialogComponent } from 'app/entities/contato-estabelecimento/contato-estabelecimento-delete-dialog.component';
import { ContatoEstabelecimentoService } from 'app/entities/contato-estabelecimento/contato-estabelecimento.service';

describe('Component Tests', () => {
    describe('ContatoEstabelecimento Management Delete Component', () => {
        let comp: ContatoEstabelecimentoDeleteDialogComponent;
        let fixture: ComponentFixture<ContatoEstabelecimentoDeleteDialogComponent>;
        let service: ContatoEstabelecimentoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [ContatoEstabelecimentoDeleteDialogComponent]
            })
                .overrideTemplate(ContatoEstabelecimentoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ContatoEstabelecimentoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContatoEstabelecimentoService);
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
