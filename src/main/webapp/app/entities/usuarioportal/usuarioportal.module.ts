import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmtprojectSharedModule } from 'app/shared';
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
    imports: [CmtprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UsuarioportalComponent,
        UsuarioportalDetailComponent,
        UsuarioportalUpdateComponent,
        UsuarioportalDeleteDialogComponent,
        UsuarioportalDeletePopupComponent
    ],
    entryComponents: [
        UsuarioportalComponent,
        UsuarioportalUpdateComponent,
        UsuarioportalDeleteDialogComponent,
        UsuarioportalDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmtprojectUsuarioportalModule {}
