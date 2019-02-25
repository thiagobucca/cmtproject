/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { RelatoriocontapagarreceberUpdateComponent } from 'app/entities/relatoriocontapagarreceber/relatoriocontapagarreceber-update.component';
import { RelatoriocontapagarreceberService } from 'app/entities/relatoriocontapagarreceber/relatoriocontapagarreceber.service';
import { Relatoriocontapagarreceber } from 'app/shared/model/relatoriocontapagarreceber.model';

describe('Component Tests', () => {
    describe('Relatoriocontapagarreceber Management Update Component', () => {
        let comp: RelatoriocontapagarreceberUpdateComponent;
        let fixture: ComponentFixture<RelatoriocontapagarreceberUpdateComponent>;
        let service: RelatoriocontapagarreceberService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [RelatoriocontapagarreceberUpdateComponent]
            })
                .overrideTemplate(RelatoriocontapagarreceberUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RelatoriocontapagarreceberUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RelatoriocontapagarreceberService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Relatoriocontapagarreceber(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.relatoriocontapagarreceber = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Relatoriocontapagarreceber();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.relatoriocontapagarreceber = entity;
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
