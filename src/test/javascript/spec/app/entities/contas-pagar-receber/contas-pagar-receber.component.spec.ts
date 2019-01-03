/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmtprojectTestModule } from '../../../test.module';
import { ContasPagarReceberComponent } from 'app/entities/contas-pagar-receber/contas-pagar-receber.component';
import { ContasPagarReceberService } from 'app/entities/contas-pagar-receber/contas-pagar-receber.service';
import { ContasPagarReceber } from 'app/shared/model/contas-pagar-receber.model';

describe('Component Tests', () => {
    describe('ContasPagarReceber Management Component', () => {
        let comp: ContasPagarReceberComponent;
        let fixture: ComponentFixture<ContasPagarReceberComponent>;
        let service: ContasPagarReceberService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmtprojectTestModule],
                declarations: [ContasPagarReceberComponent],
                providers: []
            })
                .overrideTemplate(ContasPagarReceberComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ContasPagarReceberComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContasPagarReceberService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ContasPagarReceber(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.contasPagarRecebers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
