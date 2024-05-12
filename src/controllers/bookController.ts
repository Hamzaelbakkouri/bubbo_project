// book Controler
import asynchandler from "express-async-handler";
import { IBook } from "../types/bookTypes";
import { BookSchema, validator } from "../validator/JoiSchemas";
import { BookService } from "../services/BookService";
import { sanitizer } from "../utils/sanitizer";

const getAllBooks = asynchandler(async (_req, res) => {
    const books = await BookService.getBooks();
    res.status(201).json(books);
});

const getOneBook = asynchandler(async (req, res) => {
    const bookId = req.params.id;
    const book = await BookService.getBookById(bookId);
    res.status(201).json(book);
});

const createBook = asynchandler(async (req, res) => {
    const newBookData: IBook = req.body;
    const validationErrors = validator(BookSchema, req.body);

    if (validationErrors) {
        res.status(400).json({ errors: validationErrors });
        return;
    }
    // Sanitize the data from extra spaces in th front and the end and between each carracter
    const SanitizedData = sanitizer(newBookData);

    const newBook = await BookService.createNewBook(SanitizedData);

    res.status(201).json({ message: "Book created successfully.", newBook });
});

const updateBook = asynchandler(async (req, res) => {
    const bookId = req.params.id;
    const updatedBookData: IBook = req.body;

    const validationErrors = validator(BookSchema, req.body);

    if (validationErrors) {
        res.status(400).json({ errors: validationErrors });
        return;
    }

    // Sanitize the data from extra spaces in th front and the end and between each carracter
    const SanitizedData = sanitizer(updatedBookData);

    const updatedBook = await BookService.updateBookById(bookId, SanitizedData);

    res.status(200).json({
        message: "Book updated successfully.",
        updatedBook
    });
});

const deleteBook = asynchandler(async (req, res) => {
    const bookId = req.params.id;
    await BookService.deleteBookById(bookId);
    res.status(200).json({ message: "Book deleted successfully." });
});

export { getAllBooks, getOneBook, createBook, updateBook, deleteBook };
