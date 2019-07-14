import express, { Response, Request } from 'express';
import chalk from 'chalk';
import { getEnvironmentVariables } from './utils/getEnvironmentVariables';
import { search } from './routes/search';
import { book } from './routes/book';
import { author } from './routes/author';

const { SERVER_PORT } = getEnvironmentVariables();
const app = express();

app.get('/', search);
app.get('/book/:id', book);
app.get('/author/:id', author);

app.get('*', (req: Request, res: Response) => {
  res.status(404).send('Route not found!');
});

app.listen(SERVER_PORT, () =>
  console.log(chalk.black.bgYellow(`Listening on portuano ${SERVER_PORT}!`))
);
