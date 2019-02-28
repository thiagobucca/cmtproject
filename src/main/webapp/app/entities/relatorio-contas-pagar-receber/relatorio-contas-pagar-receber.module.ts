import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmtprojectSharedModule } from 'app/shared';
import {
    RelatorioContasPagarReceberComponent,
    RelatorioContasPagarReceberDetailComponent,
    RelatorioContasPagarReceberUpdateComponent,
    RelatorioContasPagarReceberDeletePopupComponent,
    RelatorioContasPagarReceberDeleteDialogComponent,
    relatorioContasPagarReceberRoute,
    relatorioContasPagarReceberPopupRoute
} from './';

const ENTITY_STATES = [...relatorioContasPagarReceberRoute, ...relatorioContasPagarReceberPopupRoute];

@NgModule({
    imports: [CmtprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RelatorioContasPagarReceberComponent,
        RelatorioContasPagarReceberDetailComponent,
        RelatorioContasPagarReceberUpdateComponent,
        RelatorioContasPagarReceberDeleteDialogComponent,
        RelatorioContasPagarReceberDeletePopupComponent
    ],
    entryComponents: [
        RelatorioContasPagarReceberComponent,
        RelatorioContasPagarReceberUpdateComponent,
        RelatorioContasPagarReceberDeleteDialogComponent,
        RelatorioContasPagarReceberDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmtprojectRelatorioContasPagarReceberModule {}
