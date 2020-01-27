export interface Comment {
    pk: number;
    content: string;
    user__username: string;
    date: Date;
}
