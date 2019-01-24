import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ContasPagarReceber } from 'app/shared/model/contas-pagar-receber.model';
import { ContasPagarReceberService } from './contas-pagar-receber.service';
import { ContasPagarReceberComponent } from './contas-pagar-receber.component';
import { ContasPagarReceberDetailComponent } from './contas-pagar-receber-detail.component';
import { ContasPagarReceberUpdateComponent } from './contas-pagar-receber-update.component';
import { ContasPagarReceberDeletePopupComponent } from './contas-pagar-receber-delete-dialog.component';
import { IContasPagarReceber } from 'app/shared/model/contas-pagar-receber.model';

@Injectable({ providedIn: 'root' })
export class ContasPagarReceberResolve implements Resolve<IContasPagarReceber> {
    constructor(private service: ContasPagarReceberService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ContasPagarReceber> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ContasPagarReceber>) => response.ok),
                map((contasPagarReceber: HttpResponse<ContasPagarReceber>) => contasPagarReceber.body)
            );
        }
        return of(new ContasPagarReceber());
    }
}

export const contasPagarReceberRoute: Routes = [
    {
        path: 'contas-pagar-receber',
        component: ContasPagarReceberComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'cmtprojectApp.contasPagarReceber.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contas-pagar-receber/:id/view',
        component: ContasPagarReceberDetailComponent,
        resolve: {
            contasPagarReceber: ContasPagarReceberResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.contasPagarReceber.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contas-pagar-receber/new',
        component: ContasPagarReceberUpdateComponent,
        resolve: {
            contasPagarReceber: ContasPagarReceberResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.contasPagarReceber.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contas-pagar-receber/:id/edit',
        component: ContasPagarReceberUpdateComponent,
        resolve: {
            contasPagarReceber: ContasPagarReceberResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.contasPagarReceber.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contasPagarReceberPopupRoute: Routes = [
    {
        path: 'contas-pagar-receber/:id/delete',
        component: ContasPagarReceberDeletePopupComponent,
        resolve: {
            contasPagarReceber: ContasPagarReceberResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.contasPagarReceber.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
