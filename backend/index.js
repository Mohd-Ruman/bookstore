import express, { response } from "express";
import mongoose from "mongoose";

import { PORT, mongoDBURL } from "./config.js";
import { Book } from "./models/BookModel.js";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

// Middleware for parsin request body
app.use(express.json());

// Middleware for CORS Policy 
// Option 1 : Allow all Origins with default of CORS(*)
app.use(cors());

// Option 2 : Allow specific custom origins for cors
// app.use(
//     cors({
//         origin: "http://localhost:5555",
//         methods: ['GET', 'PUT', 'POST', 'DELETE'],
//         allowedHeaders: ['Content-Type'],

// }))


app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to BookStore')
});


app.use('/books', bookRoutes);


mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port : ${PORT}`);
            console.log("--- Oh ! Ruman <3 You silly rascal...");
        })
    })
    .catch((error) => {
        console.log(error);
    });