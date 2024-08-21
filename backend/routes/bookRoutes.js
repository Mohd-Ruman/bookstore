import express, { Router } from "express";
import { Book } from "../models/BookModel.js";
const router = express.Router();



// Router for saving a new book
router.post('/', async (request, response) =>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: "send all required fields : title, author, publish year",
            });
        }
        const newBook = {
            title : request.body.title,
            author : request.body.author,
            publishYear : request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

// Route for getting All books from database
router.get('/', async (request, response) => {
    try{
        const books = await Book.find({});
        return response.status(200).json({
            count:books.length,
            data:books
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({messag: error.message});
    }
});

// Route for getting a book with id
router.get('/:id', async(request, response) => {
    try{
        const { id } = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);

    } catch(error) {
        console.log(error);
        response.status(500).send({message:error.message});
    }
})

// Route for updating book with id
router.put('/:id', async (request, response) => {
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            response.status(400).send({
                message: "send all required fields : title, author, publish year",
            });
        }

        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result){
            return response.status(404).json({message: "Book not found"});
        }

        return response.status(200).send({message: "Book updated succesfully"})

    }catch(error){
        console.log(error);
        response.status(500).send({message: error.message});
    }
})

// Route for deleting a book by id
router.delete('/:id', async (request, response)=>{
    try{
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({messsage:"Book not found"});
        }

        return response.status(200).send({message : "Book deleted successfully"})

    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

export default router;