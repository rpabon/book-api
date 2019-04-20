import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';
import { bookList } from './routes/book-list';
import { bookSingle } from './routes/book-single';
import { author } from './routes/author';

dotenv.config();
const SERVER_PORT = process.env.SERVER_PORT || 3000;
const app = express();

app.use('/search', bookList);
app.use('/book/:id', bookSingle);
app.use('/author/:id', author)

app.listen(SERVER_PORT, () =>
  console.log(chalk.black.bgYellow(`Listening on port ${SERVER_PORT}!`))
);
