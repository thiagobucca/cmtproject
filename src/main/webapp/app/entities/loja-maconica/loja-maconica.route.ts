import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LojaMaconica } from 'app/shared/model/loja-maconica.model';
import { LojaMaconicaService } from './loja-maconica.service';
import { LojaMaconicaComponent } from './loja-maconica.component';
import { LojaMaconicaDetailComponent } from './loja-maconica-detail.component';
import { LojaMaconicaUpdateComponent } from './loja-maconica-update.component';
import { LojaMaconicaDeletePopupComponent } from './loja-maconica-delete-dialog.component';
import { ILojaMaconica } from 'app/shared/model/loja-maconica.model';

@Injectable({ providedIn: 'root' })
export class LojaMaconicaResolve implements Resolve<ILojaMaconica> {
    constructor(private service: LojaMaconicaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LojaMaconica> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<LojaMaconica>) => response.ok),
                map((lojaMaconica: HttpResponse<LojaMaconica>) => lojaMaconica.body)
            );
        }
        return of(new LojaMaconica());
    }
}

export const lojaMaconicaRoute: Routes = [
    {
        path: 'loja-maconica',
        component: LojaMaconicaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_LOJA_MACONICA'],
            defaultSort: 'id,asc',
            pageTitle: 'Loja Maçônica'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'loja-maconica/:id/view',
        component: LojaMaconicaDetailComponent,
        resolve: {
            lojaMaconica: LojaMaconicaResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_LOJA_MACONICA'],
            pageTitle: 'Loja Maçônica'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'loja-maconica/new',
        component: LojaMaconicaUpdateComponent,
        resolve: {
            lojaMaconica: LojaMaconicaResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_LOJA_MACONICA'],
            pageTitle: 'Loja Maçônica'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'loja-maconica/:id/edit',
        component: LojaMaconicaUpdateComponent,
        resolve: {
            lojaMaconica: LojaMaconicaResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_LOJA_MACONICA'],
            pageTitle: 'Loja Maçônica'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const lojaMaconicaPopupRoute: Routes = [
    {
        path: 'loja-maconica/:id/delete',
        component: LojaMaconicaDeletePopupComponent,
        resolve: {
            lojaMaconica: LojaMaconicaResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'Loja Maçônica'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
