import { Component, Input } from '@angular/core';

import { Meme } from '@app/_models';

@Component({ selector: 'app-meme', templateUrl: 'meme.component.html' })
export class MemeComponent {
    @Input() meme: Meme;
    @Input() shouldDisplayDetails = false;

    constructor() { }

    ngOnInit() { }
}
