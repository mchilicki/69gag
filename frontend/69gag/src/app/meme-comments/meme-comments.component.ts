import { CommentService } from './../_services/comment.service';
import { MemeService } from './../_services/meme.service';
import { Component, ViewChild, ElementRef, Input} from '@angular/core';
import { Meme } from '@app/_models';
import { Router } from '@angular/router'

@Component({ selector: 'app-meme-comments', templateUrl: 'meme-comments.component.html', styleUrls: ['./meme-comments.component.css'] })
export class MemeCommentsComponent {
    @Input() meme: Meme;
    currentComment: string;

    constructor(
        private commentService: CommentService) { }

    ngOnInit() { }

    postComment() {
        this.commentService.create(this.meme.pk, this.currentComment).subscribe(() => {
            window.location.reload();
        });
    }

    onCommentKey(event: any) {
        this.currentComment = event.target.value;
    }
}
