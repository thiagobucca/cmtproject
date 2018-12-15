import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CmtprojectRegionModule } from './region/region.module';
import { CmtprojectCountryModule } from './country/country.module';
import { CmtprojectLocationModule } from './location/location.module';
import { CmtprojectDepartmentModule } from './department/department.module';
import { CmtprojectTaskModule } from './task/task.module';
import { CmtprojectEmployeeModule } from './employee/employee.module';
import { CmtprojectJobModule } from './job/job.module';
import { CmtprojectJobHistoryModule } from './job-history/job-history.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        CmtprojectRegionModule,
        CmtprojectCountryModule,
        CmtprojectLocationModule,
        CmtprojectDepartmentModule,
        CmtprojectTaskModule,
        CmtprojectEmployeeModule,
        CmtprojectJobModule,
        CmtprojectJobHistoryModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmtprojectEntityModule {}
