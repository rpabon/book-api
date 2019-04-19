import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { SERVER_PORT } from './routes/constants';
import { bookList } from './routes/book-list';
import { bookSingle } from './routes/book-single';

dotenv.config();
const app = express();

app.use('/books', bookList);
app.use('/book', bookSingle);

app.listen(SERVER_PORT, () =>
  console.log(`Example app listening on port ${process.env.SERVER_PORT}!`)
);
