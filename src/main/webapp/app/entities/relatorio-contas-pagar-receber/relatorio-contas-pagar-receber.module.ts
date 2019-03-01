import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmtprojectSharedModule } from 'app/shared';
import { RelatorioContasPagarReceberComponent, RelatorioContasPagarReceberDetailComponent, relatorioContasPagarReceberRoute } from './';

const ENTITY_STATES = [...relatorioContasPagarReceberRoute];

@NgModule({
    imports: [CmtprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [RelatorioContasPagarReceberComponent, RelatorioContasPagarReceberDetailComponent],
    entryComponents: [RelatorioContasPagarReceberComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmtprojectRelatorioContasPagarReceberModule {}
