/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { ContatoLojaMaconicaUpdateComponent } from 'app/entities/contato-loja-maconica/contato-loja-maconica-update.component';
import { ContatoLojaMaconicaService } from 'app/entities/contato-loja-maconica/contato-loja-maconica.service';
import { ContatoLojaMaconica } from 'app/shared/model/contato-loja-maconica.model';

describe('Component Tests', () => {
    describe('ContatoLojaMaconica Management Update Component', () => {
        let comp: ContatoLojaMaconicaUpdateComponent;
        let fixture: ComponentFixture<ContatoLojaMaconicaUpdateComponent>;
        let service: ContatoLojaMaconicaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [ContatoLojaMaconicaUpdateComponent]
            })
                .overrideTemplate(ContatoLojaMaconicaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ContatoLojaMaconicaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContatoLojaMaconicaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ContatoLojaMaconica(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.contatoLojaMaconica = entity;
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
                    const entity = new ContatoLojaMaconica();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.contatoLojaMaconica = entity;
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
