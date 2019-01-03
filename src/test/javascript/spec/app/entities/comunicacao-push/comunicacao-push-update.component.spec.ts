/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { ComunicacaoPushUpdateComponent } from 'app/entities/comunicacao-push/comunicacao-push-update.component';
import { ComunicacaoPushService } from 'app/entities/comunicacao-push/comunicacao-push.service';
import { ComunicacaoPush } from 'app/shared/model/comunicacao-push.model';

describe('Component Tests', () => {
    describe('ComunicacaoPush Management Update Component', () => {
        let comp: ComunicacaoPushUpdateComponent;
        let fixture: ComponentFixture<ComunicacaoPushUpdateComponent>;
        let service: ComunicacaoPushService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [ComunicacaoPushUpdateComponent]
            })
                .overrideTemplate(ComunicacaoPushUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ComunicacaoPushUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComunicacaoPushService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ComunicacaoPush(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.comunicacaoPush = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ComunicacaoPush();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.comunicacaoPush = entity;
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
