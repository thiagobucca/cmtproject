import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Relatoriocupomxcmt } from 'app/shared/model/relatoriocupomxcmt.model';
import { RelatoriocupomxcmtService } from './relatoriocupomxcmt.service';
import { RelatoriocupomxcmtComponent } from './relatoriocupomxcmt.component';
import { RelatoriocupomxcmtDetailComponent } from './relatoriocupomxcmt-detail.component';
import { RelatoriocupomxcmtUpdateComponent } from './relatoriocupomxcmt-update.component';
import { RelatoriocupomxcmtDeletePopupComponent } from './relatoriocupomxcmt-delete-dialog.component';
import { IRelatoriocupomxcmt } from 'app/shared/model/relatoriocupomxcmt.model';

@Injectable({ providedIn: 'root' })
export class RelatoriocupomxcmtResolve implements Resolve<IRelatoriocupomxcmt> {
    constructor(private service: RelatoriocupomxcmtService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Relatoriocupomxcmt> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Relatoriocupomxcmt>) => response.ok),
                map((relatoriocupomxcmt: HttpResponse<Relatoriocupomxcmt>) => relatoriocupomxcmt.body)
            );
        }
        return of(new Relatoriocupomxcmt());
    }
}

export const relatoriocupomxcmtRoute: Routes = [
    {
        path: 'relatoriocupomxcmt',
        component: RelatoriocupomxcmtComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'cmtprojectApp.relatoriocupomxcmt.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'relatoriocupomxcmt/:id/view',
        component: RelatoriocupomxcmtDetailComponent,
        resolve: {
            relatoriocupomxcmt: RelatoriocupomxcmtResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.relatoriocupomxcmt.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'relatoriocupomxcmt/new',
        component: RelatoriocupomxcmtUpdateComponent,
        resolve: {
            relatoriocupomxcmt: RelatoriocupomxcmtResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.relatoriocupomxcmt.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'relatoriocupomxcmt/:id/edit',
        component: RelatoriocupomxcmtUpdateComponent,
        resolve: {
            relatoriocupomxcmt: RelatoriocupomxcmtResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.relatoriocupomxcmt.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const relatoriocupomxcmtPopupRoute: Routes = [
    {
        path: 'relatoriocupomxcmt/:id/delete',
        component: RelatoriocupomxcmtDeletePopupComponent,
        resolve: {
            relatoriocupomxcmt: RelatoriocupomxcmtResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.relatoriocupomxcmt.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
