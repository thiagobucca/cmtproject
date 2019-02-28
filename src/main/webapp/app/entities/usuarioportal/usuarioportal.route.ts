import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Usuarioportal } from 'app/shared/model/usuarioportal.model';
import { UsuarioportalService } from './usuarioportal.service';
import { UsuarioportalComponent } from './usuarioportal.component';
import { UsuarioportalDetailComponent } from './usuarioportal-detail.component';
import { UsuarioportalUpdateComponent } from './usuarioportal-update.component';
import { UsuarioportalDeletePopupComponent } from './usuarioportal-delete-dialog.component';
import { IUsuarioportal } from 'app/shared/model/usuarioportal.model';

@Injectable({ providedIn: 'root' })
export class UsuarioportalResolve implements Resolve<IUsuarioportal> {
    constructor(private service: UsuarioportalService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Usuarioportal> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Usuarioportal>) => response.ok),
                map((usuarioportal: HttpResponse<Usuarioportal>) => usuarioportal.body)
            );
        }
        return of(new Usuarioportal());
    }
}

export const usuarioportalRoute: Routes = [
    {
        path: 'usuarioportal',
        component: UsuarioportalComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'cmtprojectApp.usuarioportal.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'usuarioportal/:id/view',
        component: UsuarioportalDetailComponent,
        resolve: {
            usuarioportal: UsuarioportalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.usuarioportal.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'usuarioportal/new',
        component: UsuarioportalUpdateComponent,
        resolve: {
            usuarioportal: UsuarioportalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.usuarioportal.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'usuarioportal/:id/edit',
        component: UsuarioportalUpdateComponent,
        resolve: {
            usuarioportal: UsuarioportalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.usuarioportal.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const usuarioportalPopupRoute: Routes = [
    {
        path: 'usuarioportal/:id/delete',
        component: UsuarioportalDeletePopupComponent,
        resolve: {
            usuarioportal: UsuarioportalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.usuarioportal.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
