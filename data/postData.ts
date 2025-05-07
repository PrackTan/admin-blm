import { Post } from "@/types/post";
const postData: Post[] = [
    {
        id: "1",
        title: "Post 1",
        body: "This is the body of post 1.",
        author: "John Doe",
        category: "Technology",
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2023-01-02"),
        comments: [
            { id: "c1", body: "Great post!", username: "userA" },
            { id: "c2", body: "Thanks for sharing.", username: "userB" },
        ],
    },
    {
        id: "2",
        title: "Post 2",
        body: "This is the body of post 2.",
        author: "Jane Smith",
        category: "Health",
        createdAt: new Date("2023-02-01"),
        updatedAt: new Date("2023-02-03"),
        comments: [
            { id: "c3", body: "Very informative.", username: "userC" },
        ],
    },
    {
        id: "3",
        title: "Post 3",
        body: "This is the body of post 3.",
        author: "Alice Johnson",
        category: "Lifestyle",
        createdAt: new Date("2023-03-01"),
        updatedAt: new Date("2023-03-04"),
        comments: [
            { id: "c4", body: "I totally agree.", username: "userD" },
            { id: "c5", body: "Nice read!", username: "userE" },
            { id: "c6", body: "Thanks!", username: "userF" },
        ],
    },
    {
        id: "4",
        title: "Post 4",
        body: "This is the body of post 4.",
        author: "Bob Brown",
        category: "Finance",
        createdAt: new Date("2023-04-01"),
        updatedAt: new Date("2023-04-05"),
        comments: [],
    },
    {
        id: "5",
        title: "Post 5",
        body: "This is the body of post 5.",
        author: "Clara White",
        category: "Education",
        createdAt: new Date("2023-05-01"),
        updatedAt: new Date("2023-05-06"),
        comments: [
            { id: "c7", body: "Very helpful, thanks!", username: "userG" },
        ],
    },
];

export default postData;
