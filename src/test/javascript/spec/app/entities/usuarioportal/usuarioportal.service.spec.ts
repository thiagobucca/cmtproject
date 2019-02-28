import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmtprojectTestModule } from '../../../test.module';
import { UsuarioportalComponent } from 'app/entities/usuarioportal/usuarioportal.component';
import { UsuarioportalService } from 'app/entities/usuarioportal/index';
import { UsuarioPortal } from 'app/shared/model/usuarioportal.model';

describe('Component Tests', () => {
    describe('Usuario Portal Component', () => {
        let comp: UsuarioportalComponent;
        let fixture: ComponentFixture<UsuarioportalComponent>;
        let service: UsuarioportalService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [UsuarioportalComponent]
            })
                .overrideTemplate(UsuarioportalComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UsuarioportalComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsuarioportalService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    const headers = new HttpHeaders().append('link', 'link;link');
                    spyOn(service, 'query').and.returnValue(
                        of(
                            new HttpResponse({
                                body: [new UsuarioPortal(123)],
                                headers
                            })
                        )
                    );

                    // WHEN
                    comp.ngOnInit();
                    tick(); // simulate async

                    // THEN
                    expect(service.query).toHaveBeenCalled();
                    expect(comp.users[0]).toEqual(jasmine.objectContaining({ id: 123 }));
                })
            ));
        });

        describe('setActive', () => {
            it('Should update user and call load all', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    const headers = new HttpHeaders().append('link', 'link;link');
                    const user = new UsuarioPortal(123);
                    spyOn(service, 'query').and.returnValue(
                        of(
                            new HttpResponse({
                                body: [user],
                                headers
                            })
                        )
                    );
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ status: 200 })));

                    // WHEN
                    comp.setActive(user, true);
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(user);
                    expect(service.query).toHaveBeenCalled();
                    expect(comp.users[0]).toEqual(jasmine.objectContaining({ id: 123 }));
                })
            ));
        });
    });
});
