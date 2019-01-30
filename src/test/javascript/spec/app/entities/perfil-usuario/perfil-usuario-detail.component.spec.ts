/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { PerfilUsuarioDetailComponent } from 'app/entities/perfil-usuario/perfil-usuario-detail.component';
import { PerfilUsuario } from 'app/shared/model/perfil-usuario.model';

describe('Component Tests', () => {
    describe('PerfilUsuario Management Detail Component', () => {
        let comp: PerfilUsuarioDetailComponent;
        let fixture: ComponentFixture<PerfilUsuarioDetailComponent>;
        const route = ({ data: of({ perfilUsuario: new PerfilUsuario(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [PerfilUsuarioDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PerfilUsuarioDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PerfilUsuarioDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.perfilUsuario).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
