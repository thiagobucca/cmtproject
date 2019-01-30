import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmtprojectSharedModule } from 'app/shared';
import {
    ComunicacaoPushLojaComponent,
    ComunicacaoPushLojaDetailComponent,
    ComunicacaoPushLojaUpdateComponent,
    ComunicacaoPushLojaDeletePopupComponent,
    ComunicacaoPushLojaDeleteDialogComponent,
    comunicacaoPushLojaRoute,
    comunicacaoPushLojaPopupRoute
} from './';

const ENTITY_STATES = [...comunicacaoPushLojaRoute, ...comunicacaoPushLojaPopupRoute];

@NgModule({
    imports: [CmtprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ComunicacaoPushLojaComponent,
        ComunicacaoPushLojaDetailComponent,
        ComunicacaoPushLojaUpdateComponent,
        ComunicacaoPushLojaDeleteDialogComponent,
        ComunicacaoPushLojaDeletePopupComponent
    ],
    entryComponents: [
        ComunicacaoPushLojaComponent,
        ComunicacaoPushLojaUpdateComponent,
        ComunicacaoPushLojaDeleteDialogComponent,
        ComunicacaoPushLojaDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmtprojectComunicacaoPushLojaModule {}
