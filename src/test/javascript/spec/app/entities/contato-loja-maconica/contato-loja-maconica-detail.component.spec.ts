/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CmtprojectTestModule } from '../../../test.module';
import { ContatoLojaMaconicaDetailComponent } from 'app/entities/contato-loja-maconica/contato-loja-maconica-detail.component';
import { ContatoLojaMaconica } from 'app/shared/model/contato-loja-maconica.model';

describe('Component Tests', () => {
    describe('ContatoLojaMaconica Management Detail Component', () => {
        let comp: ContatoLojaMaconicaDetailComponent;
        let fixture: ComponentFixture<ContatoLojaMaconicaDetailComponent>;
        const route = ({ data: of({ contatoLojaMaconica: new ContatoLojaMaconica(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [ContatoLojaMaconicaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ContatoLojaMaconicaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ContatoLojaMaconicaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.contatoLojaMaconica).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
