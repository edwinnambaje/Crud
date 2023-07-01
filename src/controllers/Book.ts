import { NextFunction, Response, Request } from "express";
import mongoose from "mongoose";
import Book from "../models/Book";
import Author from "../models/Author";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    const { title, author } = req.body;
    const authors = await Author.findById(author);
    if (authors) {
        const book = new Book({
            _id: new mongoose.Types.ObjectId(),
            title,
            author
        })
        try {
            const books = await book.save();
            return res.status(200).json({ books });
        } catch (err) {
            return res.status(500).json({ err });
        }
    }
    else {
        res.status(404).json({ message: "Author not found" })
    }

};
const findBook = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
        const book = await Book.findById(id).populate('author');
        return book ? res.status(200).json({ book }) : res.status(404).json({ message: "Book not found" });
    } catch (err) {
        return res.status(500).json({ err });
    }

};
const findBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await Book.find().populate('author');
        return res.status(200).json({ book });
    } catch (err) {
        return res.status(500).json({ err });
    }

};
const updateBook = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    return Book.findById(id)
        .then((book) => {
            if (book) {
                book.set(req.body)
                return book.save()
                    .then((books) => res.status(200).json({ books }))
                    .catch(err => res.status(500).json({ err }))
            }
            else {
                res.status(404).json({ message: "Book not found" })
            }
        })
        .catch(err => res.status(500).json({ err }))
};
const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const book = await Book.findByIdAndDelete(id);
    return book ? res.status(200).json({ message: "Deleted successfully" }) : res.status(404).json({ message: "book not found" });

};
export default { createBook, findBook, findBooks, deleteBook, updateBook }