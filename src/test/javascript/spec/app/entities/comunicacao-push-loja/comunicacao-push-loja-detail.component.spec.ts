/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { ComunicacaoPushLojaDetailComponent } from 'app/entities/comunicacao-push-loja/comunicacao-push-loja-detail.component';
import { ComunicacaoPushLoja } from 'app/shared/model/comunicacao-push-loja.model';

describe('Component Tests', () => {
    describe('ComunicacaoPushLoja Management Detail Component', () => {
        let comp: ComunicacaoPushLojaDetailComponent;
        let fixture: ComponentFixture<ComunicacaoPushLojaDetailComponent>;
        const route = ({ data: of({ comunicacaoPushLoja: new ComunicacaoPushLoja(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [ComunicacaoPushLojaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ComunicacaoPushLojaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ComunicacaoPushLojaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.comunicacaoPushLoja).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
