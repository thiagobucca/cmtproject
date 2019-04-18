/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { GrupoComercialDetailComponent } from 'app/entities/grupo-comercial/grupo-comercial-detail.component';
import { GrupoComercial } from 'app/shared/model/grupo-comercial.model';

describe('Component Tests', () => {
    describe('GrupoComercial Management Detail Component', () => {
        let comp: GrupoComercialDetailComponent;
        let fixture: ComponentFixture<GrupoComercialDetailComponent>;
        const route = ({ data: of({ grupoComercial: new GrupoComercial(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [GrupoComercialDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GrupoComercialDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GrupoComercialDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.grupoComercial).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
