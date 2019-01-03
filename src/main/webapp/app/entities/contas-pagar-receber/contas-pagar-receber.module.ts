import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmtprojectSharedModule } from 'app/shared';
import {
    ContasPagarReceberComponent,
    ContasPagarReceberDetailComponent,
    ContasPagarReceberUpdateComponent,
    ContasPagarReceberDeletePopupComponent,
    ContasPagarReceberDeleteDialogComponent,
    contasPagarReceberRoute,
    contasPagarReceberPopupRoute
} from './';

const ENTITY_STATES = [...contasPagarReceberRoute, ...contasPagarReceberPopupRoute];

@NgModule({
    imports: [CmtprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ContasPagarReceberComponent,
        ContasPagarReceberDetailComponent,
        ContasPagarReceberUpdateComponent,
        ContasPagarReceberDeleteDialogComponent,
        ContasPagarReceberDeletePopupComponent
    ],
    entryComponents: [
        ContasPagarReceberComponent,
        ContasPagarReceberUpdateComponent,
        ContasPagarReceberDeleteDialogComponent,
        ContasPagarReceberDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmtprojectContasPagarReceberModule {}
