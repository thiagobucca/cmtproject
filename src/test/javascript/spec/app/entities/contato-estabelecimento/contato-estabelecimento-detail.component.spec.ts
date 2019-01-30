/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { ContatoEstabelecimentoDetailComponent } from 'app/entities/contato-estabelecimento/contato-estabelecimento-detail.component';
import { ContatoEstabelecimento } from 'app/shared/model/contato-estabelecimento.model';

describe('Component Tests', () => {
    describe('ContatoEstabelecimento Management Detail Component', () => {
        let comp: ContatoEstabelecimentoDetailComponent;
        let fixture: ComponentFixture<ContatoEstabelecimentoDetailComponent>;
        const route = ({ data: of({ contatoEstabelecimento: new ContatoEstabelecimento(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [ContatoEstabelecimentoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ContatoEstabelecimentoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ContatoEstabelecimentoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.contatoEstabelecimento).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
