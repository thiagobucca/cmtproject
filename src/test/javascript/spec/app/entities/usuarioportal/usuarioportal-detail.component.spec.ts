/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { UsuarioportalDetailComponent } from 'app/entities/usuarioportal/usuarioportal-detail.component';
import { UsuarioPortal } from 'app/shared/model/usuarioportal.model';

describe('Component Tests', () => {
    describe('Usuarioportal Management Detail Component', () => {
        let comp: UsuarioportalDetailComponent;
        let fixture: ComponentFixture<UsuarioportalDetailComponent>;
        const route = ({ data: of({ usuarioportal: new UsuarioPortal(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [UsuarioportalDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(UsuarioportalDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UsuarioportalDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.user).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
