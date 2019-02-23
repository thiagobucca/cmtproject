import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ContatoEstabelecimento } from 'app/shared/model/contato-estabelecimento.model';
import { ContatoEstabelecimentoService } from './contato-estabelecimento.service';
import { ContatoEstabelecimentoComponent } from './contato-estabelecimento.component';
import { ContatoEstabelecimentoDetailComponent } from './contato-estabelecimento-detail.component';
import { ContatoEstabelecimentoUpdateComponent } from './contato-estabelecimento-update.component';
import { ContatoEstabelecimentoDeletePopupComponent } from './contato-estabelecimento-delete-dialog.component';
import { IContatoEstabelecimento } from 'app/shared/model/contato-estabelecimento.model';

@Injectable({ providedIn: 'root' })
export class ContatoEstabelecimentoResolve implements Resolve<IContatoEstabelecimento> {
    constructor(private service: ContatoEstabelecimentoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ContatoEstabelecimento> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ContatoEstabelecimento>) => response.ok),
                map((contatoEstabelecimento: HttpResponse<ContatoEstabelecimento>) => contatoEstabelecimento.body)
            );
        }
        return of(new ContatoEstabelecimento());
    }
}

export const contatoEstabelecimentoRoute: Routes = [
    {
        path: 'contato-estabelecimento',
        component: ContatoEstabelecimentoComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            defaultSort: 'id,asc',
            pageTitle: 'cmtprojectApp.contatoEstabelecimento.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contato-estabelecimento/:id/view',
        component: ContatoEstabelecimentoDetailComponent,
        resolve: {
            contatoEstabelecimento: ContatoEstabelecimentoResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'cmtprojectApp.contatoEstabelecimento.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contato-estabelecimento/new',
        component: ContatoEstabelecimentoUpdateComponent,
        resolve: {
            contatoEstabelecimento: ContatoEstabelecimentoResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'cmtprojectApp.contatoEstabelecimento.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contato-estabelecimento/:id/edit',
        component: ContatoEstabelecimentoUpdateComponent,
        resolve: {
            contatoEstabelecimento: ContatoEstabelecimentoResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'cmtprojectApp.contatoEstabelecimento.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contatoEstabelecimentoPopupRoute: Routes = [
    {
        path: 'contato-estabelecimento/:id/delete',
        component: ContatoEstabelecimentoDeletePopupComponent,
        resolve: {
            contatoEstabelecimento: ContatoEstabelecimentoResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'cmtprojectApp.contatoEstabelecimento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
