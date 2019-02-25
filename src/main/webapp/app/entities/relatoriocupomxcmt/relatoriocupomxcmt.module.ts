import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmtprojectSharedModule } from 'app/shared';
import {
    RelatoriocupomxcmtComponent,
    RelatoriocupomxcmtDetailComponent,
    RelatoriocupomxcmtUpdateComponent,
    RelatoriocupomxcmtDeletePopupComponent,
    RelatoriocupomxcmtDeleteDialogComponent,
    relatoriocupomxcmtRoute,
    relatoriocupomxcmtPopupRoute
} from './';

const ENTITY_STATES = [...relatoriocupomxcmtRoute, ...relatoriocupomxcmtPopupRoute];

@NgModule({
    imports: [CmtprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RelatoriocupomxcmtComponent,
        RelatoriocupomxcmtDetailComponent,
        RelatoriocupomxcmtUpdateComponent,
        RelatoriocupomxcmtDeleteDialogComponent,
        RelatoriocupomxcmtDeletePopupComponent
    ],
    entryComponents: [
        RelatoriocupomxcmtComponent,
        RelatoriocupomxcmtUpdateComponent,
        RelatoriocupomxcmtDeleteDialogComponent,
        RelatoriocupomxcmtDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmtprojectRelatoriocupomxcmtModule {}
