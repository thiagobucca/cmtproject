import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UsuarioPortal } from 'app/shared/model/usuarioportal.model';
import { UsuarioportalService } from './usuarioportal.service';
import { UsuarioportalComponent } from './usuarioportal.component';
import { UsuarioportalDetailComponent } from './usuarioportal-detail.component';
import { UsuarioportalUpdateComponent } from './usuarioportal-update.component';
import { UsuarioportalDeletePopupComponent } from './usuarioportal-delete-dialog.component';
import { IUsuarioPortal } from 'app/shared/model/usuarioportal.model';

@Injectable({ providedIn: 'root' })
export class UsuarioportalResolve implements Resolve<IUsuarioPortal> {
    constructor(private service: UsuarioportalService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['login'] ? route.params['login'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<UsuarioPortal>) => response.ok),
                map((user: HttpResponse<UsuarioPortal>) => user.body)
            );
        }
        return new UsuarioPortal();
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
            pageTitle: 'Usuários Portal'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'usuarioportal/:login/view',
        component: UsuarioportalDetailComponent,
        resolve: {
            user: UsuarioportalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Usuários Portal'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'usuarioportal/new',
        component: UsuarioportalUpdateComponent,
        resolve: {
            user: UsuarioportalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Usuários Portal'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'usuarioportal/:login/edit',
        component: UsuarioportalUpdateComponent,
        resolve: {
            user: UsuarioportalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Usuários Portal'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const usuarioportalPopupRoute: Routes = [
    {
        path: 'usuarioportal/:login/delete',
        component: UsuarioportalDeletePopupComponent,
        resolve: {
            user: UsuarioportalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Usuários Portal'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
