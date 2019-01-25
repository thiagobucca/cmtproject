/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { ParametrizacaoUpdateComponent } from 'app/entities/parametrizacao/parametrizacao-update.component';
import { ParametrizacaoService } from 'app/entities/parametrizacao/parametrizacao.service';
import { Parametrizacao } from 'app/shared/model/parametrizacao.model';

describe('Component Tests', () => {
    describe('Parametrizacao Management Update Component', () => {
        let comp: ParametrizacaoUpdateComponent;
        let fixture: ComponentFixture<ParametrizacaoUpdateComponent>;
        let service: ParametrizacaoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [ParametrizacaoUpdateComponent]
            })
                .overrideTemplate(ParametrizacaoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ParametrizacaoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParametrizacaoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Parametrizacao(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.parametrizacao = entity;
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
                    const entity = new Parametrizacao();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.parametrizacao = entity;
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
