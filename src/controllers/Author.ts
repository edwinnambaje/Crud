import { NextFunction, Response, Request } from "express";
import mongoose from "mongoose";
import Author from "../models/Author";

const createAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const author = new Author({
        _id: new mongoose.Types.ObjectId(),
        name
    })
    try {
        const author_1 = await author.save();
        return res.status(200).json({ author_1 });
    } catch (err) {
        return res.status(500).json({ err });
    }

};
const findAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
        const author = await Author.findById(id);
        return author ? res.status(200).json({ author }) : res.status(404).json({ message: "Author not found" });
    } catch (err) {
        return res.status(500).json({ err });
    }

};
const findAuthors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = await Author.find();
        return res.status(200).json({ author });
    } catch (err) {
        return res.status(500).json({ err });
    }

};
const updateAuthor = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    return Author.findById(id)
        .then((author) => {
            if (author) {
                author.set(req.body)
                return author.save()
                    .then((author) => res.status(200).json({ author }))
                    .catch(err => res.status(500).json({ err }))
            }
            else {
                res.status(404).json({ message: "Author not found" })
            }
        })
        .catch(err => res.status(500).json({ err }))
};
const deleteAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const author = await Author.findByIdAndDelete(id);
    return author ? res.status(200).json({ message: "Deleted successfully" }) : res.status(404).json({ message: "Author not found" });

};
export default { createAuthor, findAuthor, findAuthors, deleteAuthor, updateAuthor }