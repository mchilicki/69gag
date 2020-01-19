import { Component, Input } from '@angular/core';

import { Meme } from '@app/_models';
import { ActivatedRoute } from '@angular/router';
import { MemeService } from '@app/_services';

@Component({ templateUrl: 'meme-details.component.html' })
export class MemeDetailsComponent {
    loading = true;
    meme: Meme;

    constructor(
        private route: ActivatedRoute,
        private memeService: MemeService) { }

    ngOnInit() {
        const memeId = this.route.snapshot.params['id'];
        this.memeService.getMeme(memeId).subscribe(meme => {
            this.loading = false;
            this.meme = meme[0];
        });
    }
}
