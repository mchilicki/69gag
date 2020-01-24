import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { endpoint } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class CommentService {
    constructor(private http: HttpClient) { }

    create(memeId: number, commentContent: string): Observable<number> {
        return this.http.post<number>(endpoint.addMeme + memeId, { content: commentContent });
    }
}
