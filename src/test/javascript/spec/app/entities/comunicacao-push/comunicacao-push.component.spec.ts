/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmtprojectTestModule } from '../../../test.module';
import { ComunicacaoPushComponent } from 'app/entities/comunicacao-push/comunicacao-push.component';
import { ComunicacaoPushService } from 'app/entities/comunicacao-push/comunicacao-push.service';
import { ComunicacaoPush } from 'app/shared/model/comunicacao-push.model';

describe('Component Tests', () => {
    describe('ComunicacaoPush Management Component', () => {
        let comp: ComunicacaoPushComponent;
        let fixture: ComponentFixture<ComunicacaoPushComponent>;
        let service: ComunicacaoPushService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [ComunicacaoPushComponent],
                providers: []
            })
                .overrideTemplate(ComunicacaoPushComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ComunicacaoPushComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComunicacaoPushService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ComunicacaoPush(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.comunicacaoPushes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
