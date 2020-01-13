import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { endpoint } from '@environments/environment';
import { Meme, MemePage } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class MemeService {
    constructor(private http: HttpClient) { }

    create(meme: Meme) {
        return this.http.post<Meme>(endpoint.addMeme, meme);
    }

    getMemesPage(pageNumber: number) {
        return this.http.get<MemePage>(endpoint.getMemePage + pageNumber)
    }
}