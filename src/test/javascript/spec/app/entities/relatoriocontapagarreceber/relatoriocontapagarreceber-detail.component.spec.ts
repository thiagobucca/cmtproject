/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { RelatoriocontapagarreceberDetailComponent } from 'app/entities/relatoriocontapagarreceber/relatoriocontapagarreceber-detail.component';
import { Relatoriocontapagarreceber } from 'app/shared/model/relatoriocontapagarreceber.model';

describe('Component Tests', () => {
    describe('Relatoriocontapagarreceber Management Detail Component', () => {
        let comp: RelatoriocontapagarreceberDetailComponent;
        let fixture: ComponentFixture<RelatoriocontapagarreceberDetailComponent>;
        const route = ({ data: of({ relatoriocontapagarreceber: new Relatoriocontapagarreceber(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [RelatoriocontapagarreceberDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RelatoriocontapagarreceberDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RelatoriocontapagarreceberDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.relatoriocontapagarreceber).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
