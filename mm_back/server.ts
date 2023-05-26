import { NextFunction, Request, Response } from 'express';
import { getMovie } from './helperFunctions';
const cors = require('cors');
const allowedOrigins: string[] = ["http://localhost:3000"];

const express = require('express');
const app = express();
const PORT = 8000;

// create instance of knex
require('dotenv').config({path: './.env'});
const Knex = require("knex");
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

app.use(cors({
    origin: (origin : string, callback : Function) => {
      // Check if the origin is in the allowed origins array or if it's undefined (for cases like Postman)
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  }));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

app.use(express.json());
app.use(express.static('public'));
app.use(logger);

// ROUTES
app.post('/movies', async (req: Request, res: Response) => {
    const { year, 
            rated, 
            runtime, 
            genre, 
            director, 
            actor, 
            language,} = req.body;
    let result;

    result = await getMovie(req.body);
    // const allMoviesByDirector = await getByDirector(director);


    res.status(200).json(result);
});


// MIDDLEWARE
function logger (req: Request, res: Response, next: NextFunction) {
    console.log(`Request received on ${req.url}, METHOD: ${req.method}, BODY: ${JSON.stringify(req.body)}`);
    next();
}