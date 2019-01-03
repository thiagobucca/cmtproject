/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { CategoriaEstabelecimentoDetailComponent } from 'app/entities/categoria-estabelecimento/categoria-estabelecimento-detail.component';
import { CategoriaEstabelecimento } from 'app/shared/model/categoria-estabelecimento.model';

describe('Component Tests', () => {
    describe('CategoriaEstabelecimento Management Detail Component', () => {
        let comp: CategoriaEstabelecimentoDetailComponent;
        let fixture: ComponentFixture<CategoriaEstabelecimentoDetailComponent>;
        const route = ({ data: of({ categoriaEstabelecimento: new CategoriaEstabelecimento(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [CategoriaEstabelecimentoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CategoriaEstabelecimentoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CategoriaEstabelecimentoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.categoriaEstabelecimento).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
