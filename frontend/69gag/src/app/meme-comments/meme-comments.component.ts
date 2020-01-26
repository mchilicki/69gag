import { Component, Input } from '@angular/core';

import { Meme } from '@app/_models';

@Component({ selector: 'app-meme-comments', templateUrl: 'meme-comments.component.html' })
export class MemeCommentsComponent {
    @Input() meme: Meme;

    constructor() { }

    ngOnInit() { }
}
