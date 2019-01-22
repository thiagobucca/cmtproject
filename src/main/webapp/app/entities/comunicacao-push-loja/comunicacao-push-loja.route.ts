import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ComunicacaoPushLoja } from 'app/shared/model/comunicacao-push-loja.model';
import { ComunicacaoPushLojaService } from './comunicacao-push-loja.service';
import { ComunicacaoPushLojaComponent } from './comunicacao-push-loja.component';
import { ComunicacaoPushLojaDetailComponent } from './comunicacao-push-loja-detail.component';
import { ComunicacaoPushLojaUpdateComponent } from './comunicacao-push-loja-update.component';
import { ComunicacaoPushLojaDeletePopupComponent } from './comunicacao-push-loja-delete-dialog.component';
import { IComunicacaoPushLoja } from 'app/shared/model/comunicacao-push-loja.model';

@Injectable({ providedIn: 'root' })
export class ComunicacaoPushLojaResolve implements Resolve<IComunicacaoPushLoja> {
    constructor(private service: ComunicacaoPushLojaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ComunicacaoPushLoja> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ComunicacaoPushLoja>) => response.ok),
                map((comunicacaoPushLoja: HttpResponse<ComunicacaoPushLoja>) => comunicacaoPushLoja.body)
            );
        }
        return of(new ComunicacaoPushLoja());
    }
}

export const comunicacaoPushLojaRoute: Routes = [
    {
        path: 'comunicacao-push-loja',
        component: ComunicacaoPushLojaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.comunicacaoPushLoja.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'comunicacao-push-loja/:id/view',
        component: ComunicacaoPushLojaDetailComponent,
        resolve: {
            comunicacaoPushLoja: ComunicacaoPushLojaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.comunicacaoPushLoja.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'comunicacao-push-loja/new',
        component: ComunicacaoPushLojaUpdateComponent,
        resolve: {
            comunicacaoPushLoja: ComunicacaoPushLojaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.comunicacaoPushLoja.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'comunicacao-push-loja/:id/edit',
        component: ComunicacaoPushLojaUpdateComponent,
        resolve: {
            comunicacaoPushLoja: ComunicacaoPushLojaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.comunicacaoPushLoja.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const comunicacaoPushLojaPopupRoute: Routes = [
    {
        path: 'comunicacao-push-loja/:id/delete',
        component: ComunicacaoPushLojaDeletePopupComponent,
        resolve: {
            comunicacaoPushLoja: ComunicacaoPushLojaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.comunicacaoPushLoja.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
