import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Cupom } from 'app/shared/model/cupom.model';
import { CupomService } from './cupom.service';
import { CupomComponent } from './cupom.component';
import { CupomDetailComponent } from './cupom-detail.component';
import { CupomUpdateComponent } from './cupom-update.component';
import { CupomDeletePopupComponent } from './cupom-delete-dialog.component';
import { ICupom } from 'app/shared/model/cupom.model';

@Injectable({ providedIn: 'root' })
export class CupomResolve implements Resolve<ICupom> {
    constructor(private service: CupomService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cupom> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Cupom>) => response.ok),
                map((cupom: HttpResponse<Cupom>) => cupom.body)
            );
        }
        return of(new Cupom());
    }
}

export const cupomRoute: Routes = [
    {
        path: 'cupom',
        component: CupomComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'cmtprojectApp.cupom.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cupom/:id/view',
        component: CupomDetailComponent,
        resolve: {
            cupom: CupomResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.cupom.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cupom/new',
        component: CupomUpdateComponent,
        resolve: {
            cupom: CupomResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.cupom.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cupom/:id/edit',
        component: CupomUpdateComponent,
        resolve: {
            cupom: CupomResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.cupom.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cupomPopupRoute: Routes = [
    {
        path: 'cupom/:id/delete',
        component: CupomDeletePopupComponent,
        resolve: {
            cupom: CupomResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.cupom.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
