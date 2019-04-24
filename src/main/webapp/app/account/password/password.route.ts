import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { PasswordComponent } from './password.component';

export const passwordRoute: Route = {
    path: 'password',
    component: PasswordComponent,
    data: {
        authorities: ['ROLE_USER', 'ROLE_ESTABELECIMENTO_COMERCIAL'],
        pageTitle: 'Senha'
    },
    canActivate: [UserRouteAccessService]
};
