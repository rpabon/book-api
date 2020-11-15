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
      async resolve(_, args) {
        const searchRes = await fetchSearchData(args.q);
        return searchRes;
      },
    },
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLInt },
      },
      async resolve(_, args) {
        const bookRes = await fetchBookData(args.id);
        return bookRes;
      },
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLInt },
      },
      async resolve(_, args) {
        const authorRes = await fetchAuthorData(args.id);
        return authorRes;
      },
    },
  },
});

export const schema = new GraphQLSchema({ query: RootQuery });
