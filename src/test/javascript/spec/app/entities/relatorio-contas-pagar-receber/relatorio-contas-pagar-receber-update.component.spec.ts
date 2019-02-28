/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { RelatorioContasPagarReceberUpdateComponent } from 'app/entities/relatorio-contas-pagar-receber/relatorio-contas-pagar-receber-update.component';
import { RelatorioContasPagarReceberService } from 'app/entities/relatorio-contas-pagar-receber/relatorio-contas-pagar-receber.service';
import { RelatorioContasPagarReceber } from 'app/shared/model/relatorio-contas-pagar-receber.model';

describe('Component Tests', () => {
    describe('RelatorioContasPagarReceber Management Update Component', () => {
        let comp: RelatorioContasPagarReceberUpdateComponent;
        let fixture: ComponentFixture<RelatorioContasPagarReceberUpdateComponent>;
        let service: RelatorioContasPagarReceberService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [RelatorioContasPagarReceberUpdateComponent]
            })
                .overrideTemplate(RelatorioContasPagarReceberUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RelatorioContasPagarReceberUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RelatorioContasPagarReceberService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new RelatorioContasPagarReceber(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.relatorioContasPagarReceber = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new RelatorioContasPagarReceber();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.relatorioContasPagarReceber = entity;
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
