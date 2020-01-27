import { CommentService } from './../_services/comment.service';
import { Component, Input} from '@angular/core';
import { Meme, User } from '@app/_models';
import { AuthenticationService } from './../_services/authentication.service';

@Component({ selector: 'app-meme-comments', templateUrl: 'meme-comments.component.html', styleUrls: ['./meme-comments.component.css'] })
export class MemeCommentsComponent {
    @Input() meme: Meme;
    currentComment: string;
    currentUser: User;

    constructor(
        private commentService: CommentService,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
    }

    postComment() {
        this.commentService.create(this.meme.pk, this.currentComment).subscribe(() => {
            window.location.reload();
        });
    }

    onCommentKey(event: any) {
        this.currentComment = event.target.value;
    }
}
