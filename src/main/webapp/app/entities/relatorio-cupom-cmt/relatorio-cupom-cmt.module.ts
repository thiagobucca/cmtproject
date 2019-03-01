import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmtprojectSharedModule } from 'app/shared';
import { RelatorioCupomCmtComponent, RelatorioCupomCmtDetailComponent, relatorioCupomCmtRoute } from './';

const ENTITY_STATES = [...relatorioCupomCmtRoute];

@NgModule({
    imports: [CmtprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [RelatorioCupomCmtComponent, RelatorioCupomCmtDetailComponent],
    entryComponents: [RelatorioCupomCmtComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmtprojectRelatorioCupomCmtModule {}
