import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RelatorioCupomCmt } from 'app/shared/model/relatorio-cupom-cmt.model';
import { RelatorioCupomCmtService } from './relatorio-cupom-cmt.service';
import { RelatorioCupomCmtComponent } from './relatorio-cupom-cmt.component';
import { RelatorioCupomCmtDetailComponent } from './relatorio-cupom-cmt-detail.component';
import { RelatorioCupomCmtUpdateComponent } from './relatorio-cupom-cmt-update.component';
import { RelatorioCupomCmtDeletePopupComponent } from './relatorio-cupom-cmt-delete-dialog.component';
import { IRelatorioCupomCmt } from 'app/shared/model/relatorio-cupom-cmt.model';

@Injectable({ providedIn: 'root' })
export class RelatorioCupomCmtResolve implements Resolve<IRelatorioCupomCmt> {
    constructor(private service: RelatorioCupomCmtService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RelatorioCupomCmt> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<RelatorioCupomCmt>) => response.ok),
                map((relatorioCupomCmt: HttpResponse<RelatorioCupomCmt>) => relatorioCupomCmt.body)
            );
        }
        return of(new RelatorioCupomCmt());
    }
}

export const relatorioCupomCmtRoute: Routes = [
    {
        path: 'relatorio-cupom-cmt',
        component: RelatorioCupomCmtComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.relatorioCupomCmt.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'relatorio-cupom-cmt/:id/view',
        component: RelatorioCupomCmtDetailComponent,
        resolve: {
            relatorioCupomCmt: RelatorioCupomCmtResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.relatorioCupomCmt.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'relatorio-cupom-cmt/new',
        component: RelatorioCupomCmtUpdateComponent,
        resolve: {
            relatorioCupomCmt: RelatorioCupomCmtResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.relatorioCupomCmt.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'relatorio-cupom-cmt/:id/edit',
        component: RelatorioCupomCmtUpdateComponent,
        resolve: {
            relatorioCupomCmt: RelatorioCupomCmtResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.relatorioCupomCmt.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const relatorioCupomCmtPopupRoute: Routes = [
    {
        path: 'relatorio-cupom-cmt/:id/delete',
        component: RelatorioCupomCmtDeletePopupComponent,
        resolve: {
            relatorioCupomCmt: RelatorioCupomCmtResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.relatorioCupomCmt.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
