/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { EstabelecimentoComercialUpdateComponent } from 'app/entities/estabelecimento-comercial/estabelecimento-comercial-update.component';
import { EstabelecimentoComercialService } from 'app/entities/estabelecimento-comercial/estabelecimento-comercial.service';
import { EstabelecimentoComercial } from 'app/shared/model/estabelecimento-comercial.model';

describe('Component Tests', () => {
    describe('EstabelecimentoComercial Management Update Component', () => {
        let comp: EstabelecimentoComercialUpdateComponent;
        let fixture: ComponentFixture<EstabelecimentoComercialUpdateComponent>;
        let service: EstabelecimentoComercialService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [EstabelecimentoComercialUpdateComponent]
            })
                .overrideTemplate(EstabelecimentoComercialUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EstabelecimentoComercialUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstabelecimentoComercialService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new EstabelecimentoComercial(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.estabelecimentoComercial = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new EstabelecimentoComercial();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.estabelecimentoComercial = entity;
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
