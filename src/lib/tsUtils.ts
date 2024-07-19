export interface BlogItem {
    id: number;
    title: string;
    body: string;
}

export type BlogItems = BlogItem[];

export type BlogPost = {
    title: string;
    body: string;
    id?: number;
}