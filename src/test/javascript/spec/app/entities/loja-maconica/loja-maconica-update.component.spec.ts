/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { LojaMaconicaUpdateComponent } from 'app/entities/loja-maconica/loja-maconica-update.component';
import { LojaMaconicaService } from 'app/entities/loja-maconica/loja-maconica.service';
import { LojaMaconica } from 'app/shared/model/loja-maconica.model';

describe('Component Tests', () => {
    describe('LojaMaconica Management Update Component', () => {
        let comp: LojaMaconicaUpdateComponent;
        let fixture: ComponentFixture<LojaMaconicaUpdateComponent>;
        let service: LojaMaconicaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [LojaMaconicaUpdateComponent]
            })
                .overrideTemplate(LojaMaconicaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LojaMaconicaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LojaMaconicaService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new LojaMaconica(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.lojaMaconica = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new LojaMaconica();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.lojaMaconica = entity;
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
