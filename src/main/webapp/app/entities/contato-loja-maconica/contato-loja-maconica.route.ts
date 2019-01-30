import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ContatoLojaMaconica } from 'app/shared/model/contato-loja-maconica.model';
import { ContatoLojaMaconicaService } from './contato-loja-maconica.service';
import { ContatoLojaMaconicaComponent } from './contato-loja-maconica.component';
import { ContatoLojaMaconicaDetailComponent } from './contato-loja-maconica-detail.component';
import { ContatoLojaMaconicaUpdateComponent } from './contato-loja-maconica-update.component';
import { ContatoLojaMaconicaDeletePopupComponent } from './contato-loja-maconica-delete-dialog.component';
import { IContatoLojaMaconica } from 'app/shared/model/contato-loja-maconica.model';

@Injectable({ providedIn: 'root' })
export class ContatoLojaMaconicaResolve implements Resolve<IContatoLojaMaconica> {
    constructor(private service: ContatoLojaMaconicaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ContatoLojaMaconica> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ContatoLojaMaconica>) => response.ok),
                map((contatoLojaMaconica: HttpResponse<ContatoLojaMaconica>) => contatoLojaMaconica.body)
            );
        }
        return of(new ContatoLojaMaconica());
    }
}

export const contatoLojaMaconicaRoute: Routes = [
    {
        path: 'contato-loja-maconica',
        component: ContatoLojaMaconicaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'cmtprojectApp.contatoLojaMaconica.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contato-loja-maconica/:id/view',
        component: ContatoLojaMaconicaDetailComponent,
        resolve: {
            contatoLojaMaconica: ContatoLojaMaconicaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.contatoLojaMaconica.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contato-loja-maconica/new',
        component: ContatoLojaMaconicaUpdateComponent,
        resolve: {
            contatoLojaMaconica: ContatoLojaMaconicaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.contatoLojaMaconica.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contato-loja-maconica/:id/edit',
        component: ContatoLojaMaconicaUpdateComponent,
        resolve: {
            contatoLojaMaconica: ContatoLojaMaconicaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.contatoLojaMaconica.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contatoLojaMaconicaPopupRoute: Routes = [
    {
        path: 'contato-loja-maconica/:id/delete',
        component: ContatoLojaMaconicaDeletePopupComponent,
        resolve: {
            contatoLojaMaconica: ContatoLojaMaconicaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.contatoLojaMaconica.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
