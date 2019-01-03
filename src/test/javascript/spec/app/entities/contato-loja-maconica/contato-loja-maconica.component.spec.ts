/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmtprojectTestModule } from '../../../test.module';
import { ContatoLojaMaconicaComponent } from 'app/entities/contato-loja-maconica/contato-loja-maconica.component';
import { ContatoLojaMaconicaService } from 'app/entities/contato-loja-maconica/contato-loja-maconica.service';
import { ContatoLojaMaconica } from 'app/shared/model/contato-loja-maconica.model';

describe('Component Tests', () => {
    describe('ContatoLojaMaconica Management Component', () => {
        let comp: ContatoLojaMaconicaComponent;
        let fixture: ComponentFixture<ContatoLojaMaconicaComponent>;
        let service: ContatoLojaMaconicaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [ContatoLojaMaconicaComponent],
                providers: []
            })
                .overrideTemplate(ContatoLojaMaconicaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ContatoLojaMaconicaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContatoLojaMaconicaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ContatoLojaMaconica(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.contatoLojaMaconicas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
