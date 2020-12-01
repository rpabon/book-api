import express from 'express';
import cors from 'cors';
import redis from 'redis';
import { graphqlHTTP } from 'express-graphql';
import { getEnvironmentVariables } from './utils/getEnvironmentVariables';
import { cacheHandler } from './utils/cacheHandler';
import { schema } from './graphQL/schema';
import { search } from './routes/search';
import { book } from './routes/book';
import { author } from './routes/author';
import { notFound } from './routes/notFound';

const { PORT, REDIS_URL } = getEnvironmentVariables();
const app = express();
const redisClient = redis.createClient(REDIS_URL);

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    context: { redisClient },
    graphiql: true,
  })
);

app.get(
  ['/', '/search'],
  cacheHandler('search', redisClient),
  search(redisClient)
);

app.get('/book/:id', cacheHandler('book', redisClient), book(redisClient));

app.get(
  '/author/:id',
  cacheHandler('author', redisClient),
  author(redisClient)
);

app.get('*', notFound);

app.listen(PORT, () => {
  // tslint:disable-next-line: no-console
  console.log(`Listening on port ${PORT}!`);
});
