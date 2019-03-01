import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RelatorioContasPagarReceber } from 'app/shared/model/relatorio-contas-pagar-receber.model';
import { RelatorioContasPagarReceberService } from './relatorio-contas-pagar-receber.service';
import { RelatorioContasPagarReceberComponent } from './relatorio-contas-pagar-receber.component';
import { RelatorioContasPagarReceberDetailComponent } from './relatorio-contas-pagar-receber-detail.component';
import { IRelatorioContasPagarReceber } from 'app/shared/model/relatorio-contas-pagar-receber.model';

@Injectable({ providedIn: 'root' })
export class RelatorioContasPagarReceberResolve implements Resolve<IRelatorioContasPagarReceber> {
    constructor(private service: RelatorioContasPagarReceberService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RelatorioContasPagarReceber> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<RelatorioContasPagarReceber>) => response.ok),
                map((relatorioContasPagarReceber: HttpResponse<RelatorioContasPagarReceber>) => relatorioContasPagarReceber.body)
            );
        }
        return of(new RelatorioContasPagarReceber());
    }
}

export const relatorioContasPagarReceberRoute: Routes = [
    {
        path: 'relatorio-contas-pagar-receber',
        component: RelatorioContasPagarReceberComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.relatorioContasPagarReceber.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'relatorio-contas-pagar-receber/:id/view',
        component: RelatorioContasPagarReceberDetailComponent,
        resolve: {
            relatorioContasPagarReceber: RelatorioContasPagarReceberResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.relatorioContasPagarReceber.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
