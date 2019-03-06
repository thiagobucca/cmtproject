import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ComunicacaoPush } from 'app/shared/model/comunicacao-push.model';
import { ComunicacaoPushService } from './comunicacao-push.service';
import { ComunicacaoPushComponent } from './comunicacao-push.component';
import { ComunicacaoPushDetailComponent } from './comunicacao-push-detail.component';
import { ComunicacaoPushUpdateComponent } from './comunicacao-push-update.component';
import { ComunicacaoPushDeletePopupComponent } from './comunicacao-push-delete-dialog.component';
import { IComunicacaoPush } from 'app/shared/model/comunicacao-push.model';

@Injectable({ providedIn: 'root' })
export class ComunicacaoPushResolve implements Resolve<IComunicacaoPush> {
    constructor(private service: ComunicacaoPushService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ComunicacaoPush> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ComunicacaoPush>) => response.ok),
                map((comunicacaoPush: HttpResponse<ComunicacaoPush>) => comunicacaoPush.body)
            );
        }
        return of(new ComunicacaoPush());
    }
}

export const comunicacaoPushRoute: Routes = [
    {
        path: 'comunicacao-push',
        component: ComunicacaoPushComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            defaultSort: 'id,asc',
            pageTitle: 'Comunicação Push'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'comunicacao-push/:id/view',
        component: ComunicacaoPushDetailComponent,
        resolve: {
            comunicacaoPush: ComunicacaoPushResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'Comunicação Push'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'comunicacao-push/new',
        component: ComunicacaoPushUpdateComponent,
        resolve: {
            comunicacaoPush: ComunicacaoPushResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'Comunicação Push'
        },
        canActivate: [UserRouteAccessService]
    }
    // {
    //     path: 'comunicacao-push/:id/edit',
    //     component: ComunicacaoPushUpdateComponent,
    //     resolve: {
    //         comunicacaoPush: ComunicacaoPushResolve
    //     },
    //     data: {
    //         authorities: ['ROLE_USER', 'ROLE_ADMIN'],
    //         pageTitle: 'Comunicação Push'
    //     },
    //     canActivate: [UserRouteAccessService]
    // }
];

export const comunicacaoPushPopupRoute: Routes = [
    {
        path: 'comunicacao-push/:id/delete',
        component: ComunicacaoPushDeletePopupComponent,
        resolve: {
            comunicacaoPush: ComunicacaoPushResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'Comunicação Push'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
