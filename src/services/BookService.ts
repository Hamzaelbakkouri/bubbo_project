import { IBook } from "../types/bookTypes";
import Book, { BooksCollection } from "../collections/BooksCollection";

const getBooks = async () => {
    const snapshot = await BooksCollection.get();
    const books = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return books;
};

const createNewBook = async (newBookData: IBook) => {
    const newBook = new Book(newBookData);
    await newBook.save();
    return newBook;
};

const getBookById = async (bookId: string) => {
    const docSnapshot = await BooksCollection.doc(bookId).get();
    if (!docSnapshot.exists) {
        throw new Error("Book not found");
    }
    const bookData = { id: docSnapshot.id, ...docSnapshot.data() };
    return bookData;
};

const updateBookById = async (bookId: string, updatedBookData: IBook) => {
    const docRef = BooksCollection.doc(bookId);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
        throw new Error("Book not found");
    }

    await docRef.update({ ...updatedBookData });

    const updatedBook = { id: docSnapshot.id, ...updatedBookData };
    return updatedBook;
};

const deleteBookById = async (bookId: string) => {
    const docRef = BooksCollection.doc(bookId);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
        throw new Error("Book not found");
    }

    await docRef.delete();

    const deletedBook = { id: docSnapshot.id, ...docSnapshot.data() };
    return deletedBook;
};

export const BookService = {
    getBooks,
    createNewBook,
    getBookById,
    updateBookById,
    deleteBookById
};
