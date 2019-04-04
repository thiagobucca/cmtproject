import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute, sidebarRoute, loadingRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

const LAYOUT_ROUTES = [navbarRoute, sidebarRoute, loadingRoute, ...errorRoute];

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                ...LAYOUT_ROUTES,
                {
                    path: 'admin',
                    loadChildren: './admin/admin.module#CmtprojectAdminModule',
                    data: {
                        authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_LOJA_MACONICA', 'ROLE_ESTABELECIMENTO_COMERCIAL']
                    }
                }
            ],
            { useHash: true, enableTracing: DEBUG_INFO_ENABLED }
        )
    ],
    exports: [RouterModule]
})
export class CmtprojectAppRoutingModule {}
