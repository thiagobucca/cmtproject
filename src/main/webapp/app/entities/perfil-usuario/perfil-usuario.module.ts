import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmtprojectSharedModule } from 'app/shared';
import {
    PerfilUsuarioComponent,
    PerfilUsuarioDetailComponent,
    PerfilUsuarioUpdateComponent,
    PerfilUsuarioDeletePopupComponent,
    PerfilUsuarioDeleteDialogComponent,
    perfilUsuarioRoute,
    perfilUsuarioPopupRoute
} from './';

const ENTITY_STATES = [...perfilUsuarioRoute, ...perfilUsuarioPopupRoute];

@NgModule({
    imports: [CmtprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PerfilUsuarioComponent,
        PerfilUsuarioDetailComponent,
        PerfilUsuarioUpdateComponent,
        PerfilUsuarioDeleteDialogComponent,
        PerfilUsuarioDeletePopupComponent
    ],
    entryComponents: [
        PerfilUsuarioComponent,
        PerfilUsuarioUpdateComponent,
        PerfilUsuarioDeleteDialogComponent,
        PerfilUsuarioDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmtprojectPerfilUsuarioModule {}
