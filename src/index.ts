import express, { Response, Request } from 'express';
import chalk from 'chalk';
import { getEnvironmentVariables } from './utils/getEnvironmentVariables';
import { search } from './routes/search';
import { book } from './routes/book';
import { author } from './routes/author';
import { notFound } from './routes/notFound';

const { SERVER_PORT } = getEnvironmentVariables();
const app = express();

app.get(['/', '/search'], search);
app.get('/book/:id', book);
app.get('/author/:id', author);
app.get('*', notFound);

app.listen(SERVER_PORT, () => {
  // tslint:disable-next-line: no-console
  console.log(chalk.black.bgYellow(`Listening on port ${SERVER_PORT}!`));
});
