import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmtprojectSharedModule } from 'app/shared';
import {
    RelatorioCupomCmtComponent,
    RelatorioCupomCmtDetailComponent,
    RelatorioCupomCmtUpdateComponent,
    RelatorioCupomCmtDeletePopupComponent,
    RelatorioCupomCmtDeleteDialogComponent,
    relatorioCupomCmtRoute,
    relatorioCupomCmtPopupRoute
} from './';

const ENTITY_STATES = [...relatorioCupomCmtRoute, ...relatorioCupomCmtPopupRoute];

@NgModule({
    imports: [CmtprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RelatorioCupomCmtComponent,
        RelatorioCupomCmtDetailComponent,
        RelatorioCupomCmtUpdateComponent,
        RelatorioCupomCmtDeleteDialogComponent,
        RelatorioCupomCmtDeletePopupComponent
    ],
    entryComponents: [
        RelatorioCupomCmtComponent,
        RelatorioCupomCmtUpdateComponent,
        RelatorioCupomCmtDeleteDialogComponent,
        RelatorioCupomCmtDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmtprojectRelatorioCupomCmtModule {}
