import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmtprojectSharedModule } from 'app/shared';
import {
    TipoOperacaoComponent,
    TipoOperacaoDetailComponent,
    TipoOperacaoUpdateComponent,
    TipoOperacaoDeletePopupComponent,
    TipoOperacaoDeleteDialogComponent,
    tipoOperacaoRoute,
    tipoOperacaoPopupRoute
} from './';

const ENTITY_STATES = [...tipoOperacaoRoute, ...tipoOperacaoPopupRoute];

@NgModule({
    imports: [CmtprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TipoOperacaoComponent,
        TipoOperacaoDetailComponent,
        TipoOperacaoUpdateComponent,
        TipoOperacaoDeleteDialogComponent,
        TipoOperacaoDeletePopupComponent
    ],
    entryComponents: [
        TipoOperacaoComponent,
        TipoOperacaoUpdateComponent,
        TipoOperacaoDeleteDialogComponent,
        TipoOperacaoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmtprojectTipoOperacaoModule {}
