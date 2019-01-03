/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmtprojectTestModule } from '../../../test.module';
import { PerfilUsuarioComponent } from 'app/entities/perfil-usuario/perfil-usuario.component';
import { PerfilUsuarioService } from 'app/entities/perfil-usuario/perfil-usuario.service';
import { PerfilUsuario } from 'app/shared/model/perfil-usuario.model';

describe('Component Tests', () => {
    describe('PerfilUsuario Management Component', () => {
        let comp: PerfilUsuarioComponent;
        let fixture: ComponentFixture<PerfilUsuarioComponent>;
        let service: PerfilUsuarioService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [PerfilUsuarioComponent],
                providers: []
            })
                .overrideTemplate(PerfilUsuarioComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PerfilUsuarioComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerfilUsuarioService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PerfilUsuario(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.perfilUsuarios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
