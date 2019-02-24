import { Route } from '@angular/router';

import { LoadingComponent } from './loading.component';

export const loadingRoute: Route = {
    path: '',
    component: LoadingComponent,
    outlet: 'loading'
};
