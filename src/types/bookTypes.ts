import { Timestamp } from "@firebase/firestore";

export interface IBook {
    title: string;
    image: string;
    pages: number;
    author: string;
    rating: number;
    description: string;
    language: string;
    createdAt?: Timestamp;
}
