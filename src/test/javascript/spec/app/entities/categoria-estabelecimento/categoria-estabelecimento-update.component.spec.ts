/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { CategoriaEstabelecimentoUpdateComponent } from 'app/entities/categoria-estabelecimento/categoria-estabelecimento-update.component';
import { CategoriaEstabelecimentoService } from 'app/entities/categoria-estabelecimento/categoria-estabelecimento.service';
import { CategoriaEstabelecimento } from 'app/shared/model/categoria-estabelecimento.model';

describe('Component Tests', () => {
    describe('CategoriaEstabelecimento Management Update Component', () => {
        let comp: CategoriaEstabelecimentoUpdateComponent;
        let fixture: ComponentFixture<CategoriaEstabelecimentoUpdateComponent>;
        let service: CategoriaEstabelecimentoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [CategoriaEstabelecimentoUpdateComponent]
            })
                .overrideTemplate(CategoriaEstabelecimentoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CategoriaEstabelecimentoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoriaEstabelecimentoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CategoriaEstabelecimento(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.categoriaEstabelecimento = entity;
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
                    const entity = new CategoriaEstabelecimento();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.categoriaEstabelecimento = entity;
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
