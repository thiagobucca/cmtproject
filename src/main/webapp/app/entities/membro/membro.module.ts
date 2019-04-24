import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';

import { CmtprojectSharedModule } from 'app/shared';
import {
    MembroComponent,
    MembroDetailComponent,
    MembroUpdateComponent,
    MembroDeletePopupComponent,
    MembroDeleteDialogComponent,
    membroRoute,
    membroPopupRoute
} from './';

const ENTITY_STATES = [...membroRoute, ...membroPopupRoute];

@NgModule({
    imports: [CmtprojectSharedModule, RouterModule.forChild(ENTITY_STATES), NgxMaskModule.forRoot()],
    declarations: [MembroComponent, MembroDetailComponent, MembroUpdateComponent, MembroDeleteDialogComponent, MembroDeletePopupComponent],
    entryComponents: [MembroComponent, MembroUpdateComponent, MembroDeleteDialogComponent, MembroDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmtprojectMembroModule {}
