import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { getEnvironmentVariables } from './utils/getEnvironmentVariables';
import { schema } from './graphQL/schema';
import { search } from './routes/search';
import { book } from './routes/book';
import { author } from './routes/author';
import { notFound } from './routes/notFound';

const { SERVER_PORT } = getEnvironmentVariables();
const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.get(['/', '/search'], search);
app.get('/book/:id', book);
app.get('/author/:id', author);
app.get('*', notFound);

app.listen(SERVER_PORT, () => {
  // tslint:disable-next-line: no-console
  console.log(`Listening on port ${SERVER_PORT}!`);
});
