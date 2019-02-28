/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { RelatorioCupomCmtUpdateComponent } from 'app/entities/relatorio-cupom-cmt/relatorio-cupom-cmt-update.component';
import { RelatorioCupomCmtService } from 'app/entities/relatorio-cupom-cmt/relatorio-cupom-cmt.service';
import { RelatorioCupomCmt } from 'app/shared/model/relatorio-cupom-cmt.model';

describe('Component Tests', () => {
    describe('RelatorioCupomCmt Management Update Component', () => {
        let comp: RelatorioCupomCmtUpdateComponent;
        let fixture: ComponentFixture<RelatorioCupomCmtUpdateComponent>;
        let service: RelatorioCupomCmtService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [RelatorioCupomCmtUpdateComponent]
            })
                .overrideTemplate(RelatorioCupomCmtUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RelatorioCupomCmtUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RelatorioCupomCmtService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new RelatorioCupomCmt(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.relatorioCupomCmt = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new RelatorioCupomCmt();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.relatorioCupomCmt = entity;
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
