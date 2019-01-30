import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmtprojectSharedModule } from 'app/shared';
import {
    EstabelecimentoComercialComponent,
    EstabelecimentoComercialDetailComponent,
    EstabelecimentoComercialUpdateComponent,
    EstabelecimentoComercialDeletePopupComponent,
    EstabelecimentoComercialDeleteDialogComponent,
    estabelecimentoComercialRoute,
    estabelecimentoComercialPopupRoute
} from './';

const ENTITY_STATES = [...estabelecimentoComercialRoute, ...estabelecimentoComercialPopupRoute];

@NgModule({
    imports: [CmtprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EstabelecimentoComercialComponent,
        EstabelecimentoComercialDetailComponent,
        EstabelecimentoComercialUpdateComponent,
        EstabelecimentoComercialDeleteDialogComponent,
        EstabelecimentoComercialDeletePopupComponent
    ],
    entryComponents: [
        EstabelecimentoComercialComponent,
        EstabelecimentoComercialUpdateComponent,
        EstabelecimentoComercialDeleteDialogComponent,
        EstabelecimentoComercialDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmtprojectEstabelecimentoComercialModule {}
