/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmtprojectTestModule } from '../../../test.module';
import { LojaMaconicaComponent } from 'app/entities/loja-maconica/loja-maconica.component';
import { LojaMaconicaService } from 'app/entities/loja-maconica/loja-maconica.service';
import { LojaMaconica } from 'app/shared/model/loja-maconica.model';

describe('Component Tests', () => {
    describe('LojaMaconica Management Component', () => {
        let comp: LojaMaconicaComponent;
        let fixture: ComponentFixture<LojaMaconicaComponent>;
        let service: LojaMaconicaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [LojaMaconicaComponent],
                providers: []
            })
                .overrideTemplate(LojaMaconicaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LojaMaconicaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LojaMaconicaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new LojaMaconica(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.lojaMaconicas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
