import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmtprojectSharedModule } from 'app/shared';
import {
    ParametrizacaoComponent,
    ParametrizacaoDetailComponent,
    ParametrizacaoUpdateComponent,
    ParametrizacaoDeletePopupComponent,
    ParametrizacaoDeleteDialogComponent,
    parametrizacaoRoute,
    parametrizacaoPopupRoute
} from './';

const ENTITY_STATES = [...parametrizacaoRoute, ...parametrizacaoPopupRoute];

@NgModule({
    imports: [CmtprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ParametrizacaoComponent,
        ParametrizacaoDetailComponent,
        ParametrizacaoUpdateComponent,
        ParametrizacaoDeleteDialogComponent,
        ParametrizacaoDeletePopupComponent
    ],
    entryComponents: [
        ParametrizacaoComponent,
        ParametrizacaoUpdateComponent,
        ParametrizacaoDeleteDialogComponent,
        ParametrizacaoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmtprojectParametrizacaoModule {}
