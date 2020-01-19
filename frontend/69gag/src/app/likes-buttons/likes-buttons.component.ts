import { Component, Input } from '@angular/core';

import { Meme } from '@app/_models';
import { LikeService } from '@app/_services';

@Component({ selector: 'app-likes-buttons', templateUrl: 'likes-buttons.component.html', styleUrls: ['likes-buttons.component.css'] })
export class LikesButtonsComponent {
    loading = false;
    @Input() meme: Meme;

    constructor(private likeService: LikeService) { }

    ngOnInit() { }

    likeMeme() {
        this.likeService.likeOrDeleteLike(this.meme);
    }
}
