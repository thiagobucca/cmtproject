/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmtprojectTestModule } from '../../../test.module';
import { CategoriaEstabelecimentoComponent } from 'app/entities/categoria-estabelecimento/categoria-estabelecimento.component';
import { CategoriaEstabelecimentoService } from 'app/entities/categoria-estabelecimento/categoria-estabelecimento.service';
import { CategoriaEstabelecimento } from 'app/shared/model/categoria-estabelecimento.model';

describe('Component Tests', () => {
    describe('CategoriaEstabelecimento Management Component', () => {
        let comp: CategoriaEstabelecimentoComponent;
        let fixture: ComponentFixture<CategoriaEstabelecimentoComponent>;
        let service: CategoriaEstabelecimentoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [CategoriaEstabelecimentoComponent],
                providers: []
            })
                .overrideTemplate(CategoriaEstabelecimentoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CategoriaEstabelecimentoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoriaEstabelecimentoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CategoriaEstabelecimento(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.categoriaEstabelecimentos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
