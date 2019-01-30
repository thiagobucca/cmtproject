/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { ComunicacaoPushDetailComponent } from 'app/entities/comunicacao-push/comunicacao-push-detail.component';
import { ComunicacaoPush } from 'app/shared/model/comunicacao-push.model';

describe('Component Tests', () => {
    describe('ComunicacaoPush Management Detail Component', () => {
        let comp: ComunicacaoPushDetailComponent;
        let fixture: ComponentFixture<ComunicacaoPushDetailComponent>;
        const route = ({ data: of({ comunicacaoPush: new ComunicacaoPush(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [ComunicacaoPushDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ComunicacaoPushDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ComunicacaoPushDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.comunicacaoPush).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
