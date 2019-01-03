import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EstabelecimentoComercial } from 'app/shared/model/estabelecimento-comercial.model';
import { EstabelecimentoComercialService } from './estabelecimento-comercial.service';
import { EstabelecimentoComercialComponent } from './estabelecimento-comercial.component';
import { EstabelecimentoComercialDetailComponent } from './estabelecimento-comercial-detail.component';
import { EstabelecimentoComercialUpdateComponent } from './estabelecimento-comercial-update.component';
import { EstabelecimentoComercialDeletePopupComponent } from './estabelecimento-comercial-delete-dialog.component';
import { IEstabelecimentoComercial } from 'app/shared/model/estabelecimento-comercial.model';

@Injectable({ providedIn: 'root' })
export class EstabelecimentoComercialResolve implements Resolve<IEstabelecimentoComercial> {
    constructor(private service: EstabelecimentoComercialService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EstabelecimentoComercial> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<EstabelecimentoComercial>) => response.ok),
                map((estabelecimentoComercial: HttpResponse<EstabelecimentoComercial>) => estabelecimentoComercial.body)
            );
        }
        return of(new EstabelecimentoComercial());
    }
}

export const estabelecimentoComercialRoute: Routes = [
    {
        path: 'estabelecimento-comercial',
        component: EstabelecimentoComercialComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.estabelecimentoComercial.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estabelecimento-comercial/:id/view',
        component: EstabelecimentoComercialDetailComponent,
        resolve: {
            estabelecimentoComercial: EstabelecimentoComercialResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.estabelecimentoComercial.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estabelecimento-comercial/new',
        component: EstabelecimentoComercialUpdateComponent,
        resolve: {
            estabelecimentoComercial: EstabelecimentoComercialResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.estabelecimentoComercial.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estabelecimento-comercial/:id/edit',
        component: EstabelecimentoComercialUpdateComponent,
        resolve: {
            estabelecimentoComercial: EstabelecimentoComercialResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.estabelecimentoComercial.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const estabelecimentoComercialPopupRoute: Routes = [
    {
        path: 'estabelecimento-comercial/:id/delete',
        component: EstabelecimentoComercialDeletePopupComponent,
        resolve: {
            estabelecimentoComercial: EstabelecimentoComercialResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.estabelecimentoComercial.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
