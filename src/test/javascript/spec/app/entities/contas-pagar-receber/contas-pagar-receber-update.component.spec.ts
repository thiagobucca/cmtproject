/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { ContasPagarReceberUpdateComponent } from 'app/entities/contas-pagar-receber/contas-pagar-receber-update.component';
import { ContasPagarReceberService } from 'app/entities/contas-pagar-receber/contas-pagar-receber.service';
import { ContasPagarReceber } from 'app/shared/model/contas-pagar-receber.model';

describe('Component Tests', () => {
    describe('ContasPagarReceber Management Update Component', () => {
        let comp: ContasPagarReceberUpdateComponent;
        let fixture: ComponentFixture<ContasPagarReceberUpdateComponent>;
        let service: ContasPagarReceberService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [ContasPagarReceberUpdateComponent]
            })
                .overrideTemplate(ContasPagarReceberUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ContasPagarReceberUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContasPagarReceberService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ContasPagarReceber(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.contasPagarReceber = entity;
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
                    const entity = new ContasPagarReceber();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.contasPagarReceber = entity;
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
