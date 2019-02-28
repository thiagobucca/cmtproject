import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmtprojectSharedModule } from 'app/shared';
import { NgxMaskModule } from 'ngx-mask';
import {
    UsuarioportalComponent,
    UsuarioportalDetailComponent,
    UsuarioportalUpdateComponent,
    UsuarioportalDeletePopupComponent,
    UsuarioportalDeleteDialogComponent,
    usuarioportalRoute,
    usuarioportalPopupRoute
} from './';

const ENTITY_STATES = [...usuarioportalRoute, ...usuarioportalPopupRoute];

@NgModule({
    imports: [CmtprojectSharedModule, RouterModule.forChild(ENTITY_STATES), NgxMaskModule.forRoot()],
    declarations: [
        UsuarioportalComponent,
        UsuarioportalDetailComponent,
        UsuarioportalUpdateComponent,
        UsuarioportalDeletePopupComponent,
        UsuarioportalDeleteDialogComponent
    ],
    entryComponents: [UsuarioportalComponent, UsuarioportalUpdateComponent, UsuarioportalDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmtprojectUsuarioportalModule {}
