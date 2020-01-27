import { Component, Input } from '@angular/core';

import { Meme, User } from '@app/_models';
import { LikeService } from '@app/_services';
import { AuthenticationService } from './../_services/authentication.service';

@Component({ selector: 'app-likes-buttons', templateUrl: 'likes-buttons.component.html', styleUrls: ['likes-buttons.component.css'] })
export class LikesButtonsComponent {
    @Input() meme: Meme;
    currentUser: User;

    constructor(
        private likeService: LikeService,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
     }

    likeMeme() {
        this.likeService.likeOrDeleteLike(this.meme);
    }
}
