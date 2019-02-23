import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Parametrizacao } from 'app/shared/model/parametrizacao.model';
import { ParametrizacaoService } from './parametrizacao.service';
import { ParametrizacaoComponent } from './parametrizacao.component';
import { ParametrizacaoDetailComponent } from './parametrizacao-detail.component';
import { ParametrizacaoUpdateComponent } from './parametrizacao-update.component';
import { ParametrizacaoDeletePopupComponent } from './parametrizacao-delete-dialog.component';
import { IParametrizacao } from 'app/shared/model/parametrizacao.model';

@Injectable({ providedIn: 'root' })
export class ParametrizacaoResolve implements Resolve<IParametrizacao> {
    constructor(private service: ParametrizacaoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Parametrizacao> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Parametrizacao>) => response.ok),
                map((parametrizacao: HttpResponse<Parametrizacao>) => parametrizacao.body)
            );
        }
        return of(new Parametrizacao());
    }
}

export const parametrizacaoRoute: Routes = [
    {
        path: 'parametrizacao',
        component: ParametrizacaoComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'cmtprojectApp.parametrizacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'parametrizacao/:id/view',
        component: ParametrizacaoDetailComponent,
        resolve: {
            parametrizacao: ParametrizacaoResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'cmtprojectApp.parametrizacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'parametrizacao/new',
        component: ParametrizacaoUpdateComponent,
        resolve: {
            parametrizacao: ParametrizacaoResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'cmtprojectApp.parametrizacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'parametrizacao/:id/edit',
        component: ParametrizacaoUpdateComponent,
        resolve: {
            parametrizacao: ParametrizacaoResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'cmtprojectApp.parametrizacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const parametrizacaoPopupRoute: Routes = [
    {
        path: 'parametrizacao/:id/delete',
        component: ParametrizacaoDeletePopupComponent,
        resolve: {
            parametrizacao: ParametrizacaoResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'cmtprojectApp.parametrizacao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
