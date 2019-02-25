import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Relatoriocontapagarreceber } from 'app/shared/model/relatoriocontapagarreceber.model';
import { RelatoriocontapagarreceberService } from './relatoriocontapagarreceber.service';
import { RelatoriocontapagarreceberComponent } from './relatoriocontapagarreceber.component';
import { RelatoriocontapagarreceberDetailComponent } from './relatoriocontapagarreceber-detail.component';
import { RelatoriocontapagarreceberUpdateComponent } from './relatoriocontapagarreceber-update.component';
import { RelatoriocontapagarreceberDeletePopupComponent } from './relatoriocontapagarreceber-delete-dialog.component';
import { IRelatoriocontapagarreceber } from 'app/shared/model/relatoriocontapagarreceber.model';

@Injectable({ providedIn: 'root' })
export class RelatoriocontapagarreceberResolve implements Resolve<IRelatoriocontapagarreceber> {
    constructor(private service: RelatoriocontapagarreceberService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Relatoriocontapagarreceber> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Relatoriocontapagarreceber>) => response.ok),
                map((relatoriocontapagarreceber: HttpResponse<Relatoriocontapagarreceber>) => relatoriocontapagarreceber.body)
            );
        }
        return of(new Relatoriocontapagarreceber());
    }
}

export const relatoriocontapagarreceberRoute: Routes = [
    {
        path: 'relatoriocontapagarreceber',
        component: RelatoriocontapagarreceberComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'cmtprojectApp.relatoriocontapagarreceber.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'relatoriocontapagarreceber/:id/view',
        component: RelatoriocontapagarreceberDetailComponent,
        resolve: {
            relatoriocontapagarreceber: RelatoriocontapagarreceberResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.relatoriocontapagarreceber.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'relatoriocontapagarreceber/new',
        component: RelatoriocontapagarreceberUpdateComponent,
        resolve: {
            relatoriocontapagarreceber: RelatoriocontapagarreceberResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.relatoriocontapagarreceber.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'relatoriocontapagarreceber/:id/edit',
        component: RelatoriocontapagarreceberUpdateComponent,
        resolve: {
            relatoriocontapagarreceber: RelatoriocontapagarreceberResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.relatoriocontapagarreceber.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const relatoriocontapagarreceberPopupRoute: Routes = [
    {
        path: 'relatoriocontapagarreceber/:id/delete',
        component: RelatoriocontapagarreceberDeletePopupComponent,
        resolve: {
            relatoriocontapagarreceber: RelatoriocontapagarreceberResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmtprojectApp.relatoriocontapagarreceber.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
