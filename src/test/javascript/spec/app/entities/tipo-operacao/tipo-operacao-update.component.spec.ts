/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { TipoOperacaoUpdateComponent } from 'app/entities/tipo-operacao/tipo-operacao-update.component';
import { TipoOperacaoService } from 'app/entities/tipo-operacao/tipo-operacao.service';
import { TipoOperacao } from 'app/shared/model/tipo-operacao.model';

describe('Component Tests', () => {
    describe('TipoOperacao Management Update Component', () => {
        let comp: TipoOperacaoUpdateComponent;
        let fixture: ComponentFixture<TipoOperacaoUpdateComponent>;
        let service: TipoOperacaoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [TipoOperacaoUpdateComponent]
            })
                .overrideTemplate(TipoOperacaoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TipoOperacaoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoOperacaoService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new TipoOperacao(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.tipoOperacao = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new TipoOperacao();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.tipoOperacao = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
