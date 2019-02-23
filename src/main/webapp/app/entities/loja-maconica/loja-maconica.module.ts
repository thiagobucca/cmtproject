import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgxMaskModule } from 'ngx-mask';

import { CmtprojectSharedModule } from 'app/shared';
import {
    LojaMaconicaComponent,
    LojaMaconicaDetailComponent,
    LojaMaconicaUpdateComponent,
    LojaMaconicaDeletePopupComponent,
    LojaMaconicaDeleteDialogComponent,
    lojaMaconicaRoute,
    lojaMaconicaPopupRoute
} from './';

const ENTITY_STATES = [...lojaMaconicaRoute, ...lojaMaconicaPopupRoute];

@NgModule({
    imports: [CmtprojectSharedModule, RouterModule.forChild(ENTITY_STATES), NgxMaskModule.forRoot()],
    declarations: [
        LojaMaconicaComponent,
        LojaMaconicaDetailComponent,
        LojaMaconicaUpdateComponent,
        LojaMaconicaDeleteDialogComponent,
        LojaMaconicaDeletePopupComponent
    ],
    entryComponents: [
        LojaMaconicaComponent,
        LojaMaconicaUpdateComponent,
        LojaMaconicaDeleteDialogComponent,
        LojaMaconicaDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmtprojectLojaMaconicaModule {}
