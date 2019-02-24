import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CategoriaEstabelecimento } from 'app/shared/model/categoria-estabelecimento.model';
import { CategoriaEstabelecimentoService } from './categoria-estabelecimento.service';
import { CategoriaEstabelecimentoComponent } from './categoria-estabelecimento.component';
import { CategoriaEstabelecimentoDetailComponent } from './categoria-estabelecimento-detail.component';
import { CategoriaEstabelecimentoUpdateComponent } from './categoria-estabelecimento-update.component';
import { CategoriaEstabelecimentoDeletePopupComponent } from './categoria-estabelecimento-delete-dialog.component';
import { ICategoriaEstabelecimento } from 'app/shared/model/categoria-estabelecimento.model';

@Injectable({ providedIn: 'root' })
export class CategoriaEstabelecimentoResolve implements Resolve<ICategoriaEstabelecimento> {
    constructor(private service: CategoriaEstabelecimentoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CategoriaEstabelecimento> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CategoriaEstabelecimento>) => response.ok),
                map((categoriaEstabelecimento: HttpResponse<CategoriaEstabelecimento>) => categoriaEstabelecimento.body)
            );
        }
        return of(new CategoriaEstabelecimento());
    }
}

export const categoriaEstabelecimentoRoute: Routes = [
    {
        path: 'categoria-estabelecimento',
        component: CategoriaEstabelecimentoComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            defaultSort: 'id,asc',
            pageTitle: 'Categoria Estabelecimento'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'categoria-estabelecimento/:id/view',
        component: CategoriaEstabelecimentoDetailComponent,
        resolve: {
            categoriaEstabelecimento: CategoriaEstabelecimentoResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'Categoria Estabelecimento'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'categoria-estabelecimento/new',
        component: CategoriaEstabelecimentoUpdateComponent,
        resolve: {
            categoriaEstabelecimento: CategoriaEstabelecimentoResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'Categoria Estabelecimento'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'categoria-estabelecimento/:id/edit',
        component: CategoriaEstabelecimentoUpdateComponent,
        resolve: {
            categoriaEstabelecimento: CategoriaEstabelecimentoResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'Categoria Estabelecimento'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const categoriaEstabelecimentoPopupRoute: Routes = [
    {
        path: 'categoria-estabelecimento/:id/delete',
        component: CategoriaEstabelecimentoDeletePopupComponent,
        resolve: {
            categoriaEstabelecimento: CategoriaEstabelecimentoResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'Categoria Estabelecimento'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
