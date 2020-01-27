import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

import { MemePage } from '@app/_models';
import { MemeService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    memePage: MemePage;


    constructor(
        private memeService: MemeService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.loading = true;
        let currentPage = this.route.snapshot.params['pageNumber'];
        if (!currentPage) {
            currentPage = 1;
        }
        this.memeService.getMemesPage(currentPage).subscribe(memePage => {
            this.loading = false;
            this.memePage = memePage;
        });
    }
}
