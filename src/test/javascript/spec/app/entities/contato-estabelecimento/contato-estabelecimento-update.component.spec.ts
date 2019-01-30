/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { ContatoEstabelecimentoUpdateComponent } from 'app/entities/contato-estabelecimento/contato-estabelecimento-update.component';
import { ContatoEstabelecimentoService } from 'app/entities/contato-estabelecimento/contato-estabelecimento.service';
import { ContatoEstabelecimento } from 'app/shared/model/contato-estabelecimento.model';

describe('Component Tests', () => {
    describe('ContatoEstabelecimento Management Update Component', () => {
        let comp: ContatoEstabelecimentoUpdateComponent;
        let fixture: ComponentFixture<ContatoEstabelecimentoUpdateComponent>;
        let service: ContatoEstabelecimentoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [ContatoEstabelecimentoUpdateComponent]
            })
                .overrideTemplate(ContatoEstabelecimentoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ContatoEstabelecimentoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContatoEstabelecimentoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ContatoEstabelecimento(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.contatoEstabelecimento = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ContatoEstabelecimento();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.contatoEstabelecimento = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
