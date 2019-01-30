import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmtprojectSharedModule } from 'app/shared';
import {
    CupomComponent,
    CupomDetailComponent,
    CupomUpdateComponent,
    CupomDeletePopupComponent,
    CupomDeleteDialogComponent,
    cupomRoute,
    cupomPopupRoute
} from './';

const ENTITY_STATES = [...cupomRoute, ...cupomPopupRoute];

@NgModule({
    imports: [CmtprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [CupomComponent, CupomDetailComponent, CupomUpdateComponent, CupomDeleteDialogComponent, CupomDeletePopupComponent],
    entryComponents: [CupomComponent, CupomUpdateComponent, CupomDeleteDialogComponent, CupomDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmtprojectCupomModule {}
