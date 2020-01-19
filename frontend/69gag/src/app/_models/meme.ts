import { Observable } from 'rxjs';

export interface Meme {
    pk: number;
    title: string;
    img_url: string;
    date: Date;
    userName: string;
    NumLikes: number;
    NumComments: number;
    IsLiked: boolean;
    comments: Observable<Comment[]>;
}
