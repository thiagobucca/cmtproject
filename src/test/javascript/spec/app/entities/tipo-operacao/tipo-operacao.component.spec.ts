/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmtprojectTestModule } from '../../../test.module';
import { TipoOperacaoComponent } from 'app/entities/tipo-operacao/tipo-operacao.component';
import { TipoOperacaoService } from 'app/entities/tipo-operacao/tipo-operacao.service';
import { TipoOperacao } from 'app/shared/model/tipo-operacao.model';

describe('Component Tests', () => {
    describe('TipoOperacao Management Component', () => {
        let comp: TipoOperacaoComponent;
        let fixture: ComponentFixture<TipoOperacaoComponent>;
        let service: TipoOperacaoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [TipoOperacaoComponent],
                providers: []
            })
                .overrideTemplate(TipoOperacaoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TipoOperacaoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoOperacaoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TipoOperacao(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.tipoOperacaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
