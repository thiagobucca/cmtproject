import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.scss']
})
export class SidebarComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
    isMobileMenu() {
        if (window.innerWidth > 991) {
            return false;
        }
        return true;
    }
}
