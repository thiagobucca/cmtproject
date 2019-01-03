import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoOperacao } from 'app/shared/model/tipo-operacao.model';
import { TipoOperacaoService } from './tipo-operacao.service';
import { TipoOperacaoComponent } from './tipo-operacao.component';
import { TipoOperacaoDetailComponent } from './tipo-operacao-detail.component';
import { TipoOperacaoUpdateComponent } from './tipo-operacao-update.component';
import { TipoOperacaoDeletePopupComponent } from './tipo-operacao-delete-dialog.component';
import { ITipoOperacao } from 'app/shared/model/tipo-operacao.model';

@Injectable({ providedIn: 'root' })
export class TipoOperacaoResolve implements Resolve<ITipoOperacao> {
    constructor(private service: TipoOperacaoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TipoOperacao> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TipoOperacao>) => response.ok),
                map((tipoOperacao: HttpResponse<TipoOperacao>) => tipoOperacao.body)
            );
        }
        return of(new TipoOperacao());
    }
}

export const tipoOperacaoRoute: Routes = [
    {
        path: 'tipo-operacao',
        component: TipoOperacaoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.tipoOperacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-operacao/:id/view',
        component: TipoOperacaoDetailComponent,
        resolve: {
            tipoOperacao: TipoOperacaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.tipoOperacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-operacao/new',
        component: TipoOperacaoUpdateComponent,
        resolve: {
            tipoOperacao: TipoOperacaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.tipoOperacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-operacao/:id/edit',
        component: TipoOperacaoUpdateComponent,
        resolve: {
            tipoOperacao: TipoOperacaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.tipoOperacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoOperacaoPopupRoute: Routes = [
    {
        path: 'tipo-operacao/:id/delete',
        component: TipoOperacaoDeletePopupComponent,
        resolve: {
            tipoOperacao: TipoOperacaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.tipoOperacao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
