// import { Timestamp } from "@firebase/firestore";
import db from "../config/db";
import { IBook } from "src/types/bookTypes";
import { DocumentReference } from "firebase-admin/firestore";

export const BooksCollection = db.collection("books");

// Book class
class Book {
    private data: IBook;

    constructor(data: IBook) {
        this.data = { ...data };
    }

    async save(): Promise<DocumentReference> {
        try {
            const docRef = await BooksCollection.add(this.data);
            return docRef;
        } catch (err) {
            throw new Error(err);
        }
    }
}

export default Book;

