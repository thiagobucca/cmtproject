import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmtprojectSharedModule } from 'app/shared';
import {
    CategoriaEstabelecimentoComponent,
    CategoriaEstabelecimentoDetailComponent,
    CategoriaEstabelecimentoUpdateComponent,
    CategoriaEstabelecimentoDeletePopupComponent,
    CategoriaEstabelecimentoDeleteDialogComponent,
    categoriaEstabelecimentoRoute,
    categoriaEstabelecimentoPopupRoute
} from './';

const ENTITY_STATES = [...categoriaEstabelecimentoRoute, ...categoriaEstabelecimentoPopupRoute];

@NgModule({
    imports: [CmtprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CategoriaEstabelecimentoComponent,
        CategoriaEstabelecimentoDetailComponent,
        CategoriaEstabelecimentoUpdateComponent,
        CategoriaEstabelecimentoDeleteDialogComponent,
        CategoriaEstabelecimentoDeletePopupComponent
    ],
    entryComponents: [
        CategoriaEstabelecimentoComponent,
        CategoriaEstabelecimentoUpdateComponent,
        CategoriaEstabelecimentoDeleteDialogComponent,
        CategoriaEstabelecimentoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmtprojectCategoriaEstabelecimentoModule {}
