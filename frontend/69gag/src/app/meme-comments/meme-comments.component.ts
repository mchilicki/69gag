import { CommentService } from './../_services/comment.service';
import { MemeService } from './../_services/meme.service';
import { Component, Input } from '@angular/core';

import { Meme } from '@app/_models';

@Component({ selector: 'app-meme-comments', templateUrl: 'meme-comments.component.html', styleUrls: ['./meme-comments.component.css'] })
export class MemeCommentsComponent {
    @Input() meme: Meme;
    currentComment: string;

    constructor(
        private commentService: CommentService,
        private memeService: MemeService) { }

    ngOnInit() { }

    postComment() {
        this.commentService.create(this.meme.pk, this.currentComment).subscribe(() => {
            this.memeService.getMeme(this.meme.pk).subscribe(meme => {
                this.meme = meme;
            });
        });
    }

    onCommentChange(event) {
        try {
            this.currentComment = event.target.value;
        } catch (e) { }
    }
}
