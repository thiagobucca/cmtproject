import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Membro } from 'app/shared/model/membro.model';
import { MembroService } from './membro.service';
import { MembroComponent } from './membro.component';
import { MembroDetailComponent } from './membro-detail.component';
import { MembroUpdateComponent } from './membro-update.component';
import { MembroDeletePopupComponent } from './membro-delete-dialog.component';
import { IMembro } from 'app/shared/model/membro.model';

@Injectable({ providedIn: 'root' })
export class MembroResolve implements Resolve<IMembro> {
    constructor(private service: MembroService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Membro> {
        const id = route.params['login'] ? route.params['login'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Membro>) => response.ok),
                map((membro: HttpResponse<Membro>) => membro.body)
            );
        }
        return of(new Membro());
    }
}

export const membroRoute: Routes = [
    {
        path: 'membro',
        component: MembroComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_LOJA_MACONICA'],
            defaultSort: 'id,asc',
            pageTitle: 'Membros'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'membro/:login/view',
        component: MembroDetailComponent,
        resolve: {
            user: MembroResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_LOJA_MACONICA'],
            pageTitle: 'Membros'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'membro/new',
        component: MembroUpdateComponent,
        resolve: {
            user: MembroResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Membros'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'membro/:login/edit',
        component: MembroUpdateComponent,
        resolve: {
            user: MembroResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Membros'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const membroPopupRoute: Routes = [
    {
        path: 'membro/:login/delete',
        component: MembroDeletePopupComponent,
        resolve: {
            user: MembroResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Membros'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
