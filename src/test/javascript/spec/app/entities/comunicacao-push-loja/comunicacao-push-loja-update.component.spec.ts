/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { ComunicacaoPushLojaUpdateComponent } from 'app/entities/comunicacao-push-loja/comunicacao-push-loja-update.component';
import { ComunicacaoPushLojaService } from 'app/entities/comunicacao-push-loja/comunicacao-push-loja.service';
import { ComunicacaoPushLoja } from 'app/shared/model/comunicacao-push-loja.model';

describe('Component Tests', () => {
    describe('ComunicacaoPushLoja Management Update Component', () => {
        let comp: ComunicacaoPushLojaUpdateComponent;
        let fixture: ComponentFixture<ComunicacaoPushLojaUpdateComponent>;
        let service: ComunicacaoPushLojaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [ComunicacaoPushLojaUpdateComponent]
            })
                .overrideTemplate(ComunicacaoPushLojaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ComunicacaoPushLojaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComunicacaoPushLojaService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ComunicacaoPushLoja(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.comunicacaoPushLoja = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ComunicacaoPushLoja();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.comunicacaoPushLoja = entity;
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
