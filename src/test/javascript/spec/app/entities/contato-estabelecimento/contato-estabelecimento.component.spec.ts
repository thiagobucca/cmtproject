/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmtprojectTestModule } from '../../../test.module';
import { ContatoEstabelecimentoComponent } from 'app/entities/contato-estabelecimento/contato-estabelecimento.component';
import { ContatoEstabelecimentoService } from 'app/entities/contato-estabelecimento/contato-estabelecimento.service';
import { ContatoEstabelecimento } from 'app/shared/model/contato-estabelecimento.model';

describe('Component Tests', () => {
    describe('ContatoEstabelecimento Management Component', () => {
        let comp: ContatoEstabelecimentoComponent;
        let fixture: ComponentFixture<ContatoEstabelecimentoComponent>;
        let service: ContatoEstabelecimentoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [ContatoEstabelecimentoComponent],
                providers: []
            })
                .overrideTemplate(ContatoEstabelecimentoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ContatoEstabelecimentoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContatoEstabelecimentoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ContatoEstabelecimento(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.contatoEstabelecimentos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
