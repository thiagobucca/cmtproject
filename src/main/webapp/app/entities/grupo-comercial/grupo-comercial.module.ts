import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmtprojectSharedModule } from 'app/shared';
import {
    GrupoComercialComponent,
    GrupoComercialDetailComponent,
    GrupoComercialUpdateComponent,
    GrupoComercialDeletePopupComponent,
    GrupoComercialDeleteDialogComponent,
    grupoComercialRoute,
    grupoComercialPopupRoute
} from './';

const ENTITY_STATES = [...grupoComercialRoute, ...grupoComercialPopupRoute];

@NgModule({
    imports: [CmtprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GrupoComercialComponent,
        GrupoComercialDetailComponent,
        GrupoComercialUpdateComponent,
        GrupoComercialDeleteDialogComponent,
        GrupoComercialDeletePopupComponent
    ],
    entryComponents: [
        GrupoComercialComponent,
        GrupoComercialUpdateComponent,
        GrupoComercialDeleteDialogComponent,
        GrupoComercialDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmtprojectGrupoComercialModule {}
