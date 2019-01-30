import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmtprojectSharedModule } from 'app/shared';
import {
    ComunicacaoPushComponent,
    ComunicacaoPushDetailComponent,
    ComunicacaoPushUpdateComponent,
    ComunicacaoPushDeletePopupComponent,
    ComunicacaoPushDeleteDialogComponent,
    comunicacaoPushRoute,
    comunicacaoPushPopupRoute
} from './';

const ENTITY_STATES = [...comunicacaoPushRoute, ...comunicacaoPushPopupRoute];

@NgModule({
    imports: [CmtprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ComunicacaoPushComponent,
        ComunicacaoPushDetailComponent,
        ComunicacaoPushUpdateComponent,
        ComunicacaoPushDeleteDialogComponent,
        ComunicacaoPushDeletePopupComponent
    ],
    entryComponents: [
        ComunicacaoPushComponent,
        ComunicacaoPushUpdateComponent,
        ComunicacaoPushDeleteDialogComponent,
        ComunicacaoPushDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmtprojectComunicacaoPushModule {}
