import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { endpoint } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class CommentService {
    constructor(private http: HttpClient) { }

    create(memeId: number, commentContent: string) {
        const url = endpoint.comment + memeId;
        return this.http.post(url, { content: commentContent });
    }
}
