import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CmtRegionModule } from './region/region.module';
import { CmtCountryModule } from './country/country.module';
import { CmtLocationModule } from './location/location.module';
import { CmtDepartmentModule } from './department/department.module';
import { CmtTaskModule } from './task/task.module';
import { CmtEmployeeModule } from './employee/employee.module';
import { CmtJobModule } from './job/job.module';
import { CmtJobHistoryModule } from './job-history/job-history.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        CmtRegionModule,
        CmtCountryModule,
        CmtLocationModule,
        CmtDepartmentModule,
        CmtTaskModule,
        CmtEmployeeModule,
        CmtJobModule,
        CmtJobHistoryModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmtEntityModule {}
