import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { endpoint } from '@environments/environment';
import { Meme } from '@app/_models';


@Injectable({ providedIn: 'root' })
export class LikeService {
    constructor(private http: HttpClient) { }

    likeOrDeleteLike(meme: Meme) {
        if (!meme.IsLiked) {
            this.like(meme);
            meme.IsLiked = true;
        } else {
            this.deleteLike(meme);
            meme.IsLiked = false;
        }
    }

    private like(meme: Meme) {
        const url = endpoint.like + meme.pk;
        try {
            this.http.post(url, null);
        } catch (err) {
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
    }

    private deleteLike(meme: Meme) {
        const url = endpoint.deleteLike + meme.pk;
        return this.http.delete(url);
    }
}
