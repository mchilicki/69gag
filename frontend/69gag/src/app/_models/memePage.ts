import { Meme } from '.';
import { Observable } from 'rxjs';

export interface MemePage {
    results: Observable<Meme[]>;
    totalPages: number;
    currentPage: number;
}
