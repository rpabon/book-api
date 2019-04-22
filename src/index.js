import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';
import { search } from './routes/search';
import { book } from './routes/book';
import { author } from './routes/author';

dotenv.config();
const SERVER_PORT = process.env.SERVER_PORT || 3000;
const app = express();

app.get('/', search);
app.get('/book/:id', book);
app.get('/author/:id', author);

app.get('*', (req, res) => {
  res.status(404).send('Route not found!');
});

app.listen(SERVER_PORT, () =>
  console.log(chalk.black.bgYellow(`Listening on port ${SERVER_PORT}!`))
);
