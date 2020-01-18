import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { MemePage } from '@app/_models';
import { MemeService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    memePage: MemePage;

    constructor(
        private memeService: MemeService) { }

    ngOnInit() {
        this.loading = true;
        this.memeService.getMemesPage(1).subscribe(memePage => {
            this.loading = false;
            this.memePage = memePage;
        });
    }
}