import { RedisClient } from 'redis';
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
} from 'graphql';
import { SearchType } from './SearchType';
import { BookType } from './BookType';
import { AuthorType } from './AuthorType';
import { redisQueryResolver, redisResolver } from '../utils/redis';
import { fetchSearchData } from '../utils/fetchSearchData';
import { fetchBookData } from '../utils/fetchBookData';
import { fetchAuthorData } from '../utils/fetchAuthorData';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    search: {
      type: new GraphQLList(SearchType),
      args: {
        q: { type: GraphQLString },
      },
      async resolve(_, args, { redisClient }: Context) {
        const search = await redisQueryResolver(
          redisClient,
          fetchSearchData,
          args.q
        );
        
        return search;
      },
    },
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLInt },
      },
      async resolve(_, args, { redisClient }: Context) {
        const key = String(args.id);
        const book = await redisResolver(redisClient, fetchBookData, key);
        return book;
      },
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLInt },
      },
      async resolve(_, args, { redisClient }: Context) {
        const key = String(args.id);
        const author = await redisResolver(redisClient, fetchAuthorData, key);
        return author;
      },
    },
  },
});

export const schema = new GraphQLSchema({ query: RootQuery });

interface Context {
  redisClient: RedisClient;
}
