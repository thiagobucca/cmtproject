import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GrupoComercial } from 'app/shared/model/grupo-comercial.model';
import { GrupoComercialService } from './grupo-comercial.service';
import { GrupoComercialComponent } from './grupo-comercial.component';
import { GrupoComercialDetailComponent } from './grupo-comercial-detail.component';
import { GrupoComercialUpdateComponent } from './grupo-comercial-update.component';
import { GrupoComercialDeletePopupComponent } from './grupo-comercial-delete-dialog.component';
import { IGrupoComercial } from 'app/shared/model/grupo-comercial.model';

@Injectable({ providedIn: 'root' })
export class GrupoComercialResolve implements Resolve<IGrupoComercial> {
    constructor(private service: GrupoComercialService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GrupoComercial> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<GrupoComercial>) => response.ok),
                map((grupoComercial: HttpResponse<GrupoComercial>) => grupoComercial.body)
            );
        }
        return of(new GrupoComercial());
    }
}

export const grupoComercialRoute: Routes = [
    {
        path: 'grupo-comercial',
        component: GrupoComercialComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            defaultSort: 'id,asc',
            pageTitle: 'Grupo Comercial'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'grupo-comercial/:id/view',
        component: GrupoComercialDetailComponent,
        resolve: {
            grupoComercial: GrupoComercialResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'Grupo Comercial'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'grupo-comercial/new',
        component: GrupoComercialUpdateComponent,
        resolve: {
            grupoComercial: GrupoComercialResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'Grupo Comercial'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'grupo-comercial/:id/edit',
        component: GrupoComercialUpdateComponent,
        resolve: {
            grupoComercial: GrupoComercialResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'Grupo Comercial'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const grupoComercialPopupRoute: Routes = [
    {
        path: 'grupo-comercial/:id/delete',
        component: GrupoComercialDeletePopupComponent,
        resolve: {
            grupoComercial: GrupoComercialResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'Grupo Comercial'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
