import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule, RatingModule, CalendarModule, ButtonModule } from 'primeng/primeng';

import { DragDropModule } from 'primeng/dragdrop';

@Component({
    selector: 'jhi-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent {
    val: number;
    value: Date;
}
