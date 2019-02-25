import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmtprojectSharedModule } from 'app/shared';
import {
    RelatoriocontapagarreceberComponent,
    RelatoriocontapagarreceberDetailComponent,
    RelatoriocontapagarreceberUpdateComponent,
    RelatoriocontapagarreceberDeletePopupComponent,
    RelatoriocontapagarreceberDeleteDialogComponent,
    relatoriocontapagarreceberRoute,
    relatoriocontapagarreceberPopupRoute
} from './';

const ENTITY_STATES = [...relatoriocontapagarreceberRoute, ...relatoriocontapagarreceberPopupRoute];

@NgModule({
    imports: [CmtprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RelatoriocontapagarreceberComponent,
        RelatoriocontapagarreceberDetailComponent,
        RelatoriocontapagarreceberUpdateComponent,
        RelatoriocontapagarreceberDeleteDialogComponent,
        RelatoriocontapagarreceberDeletePopupComponent
    ],
    entryComponents: [
        RelatoriocontapagarreceberComponent,
        RelatoriocontapagarreceberUpdateComponent,
        RelatoriocontapagarreceberDeleteDialogComponent,
        RelatoriocontapagarreceberDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmtprojectRelatoriocontapagarreceberModule {}
