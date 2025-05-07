export interface Post {
    id: string;
    title: string;
    body: string;
    author: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
    comments: PostComment[];
}

export interface PostComment {
    id: string;
    body: string;
    username: string;
}
