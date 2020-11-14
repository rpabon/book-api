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
import getURLSuffix from '../utils/getURLSuffix';
import { getResponseCriterion } from '../utils/getResponseCriterion';
import { parseList } from '../utils/parseList';
import { parseBook } from '../utils/parseBook';
import { parseAuthor } from '../utils/parserAuthor';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    search: {
      type: new GraphQLList(SearchType),
      args: {
        term: { type: GraphQLString },
      },
      async resolve(_, args) {
        const suffix = getURLSuffix.search(args.term);
        const { search } = await getResponseCriterion(suffix);

        return parseList(search);
      },
    },
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLInt },
      },
      async resolve(_, args) {
        const urlSuffix = getURLSuffix.book(args.id);
        const { book } = await getResponseCriterion(urlSuffix);

        return parseBook(book);
      },
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLInt },
      },
      async resolve(_, args) {
        const urlSuffix = getURLSuffix.author(args.id);
        const { author } = await getResponseCriterion(urlSuffix);

        return parseAuthor(author);
      },
    },
  },
});

//@ts-ignore
export const schema = new GraphQLSchema({ query: RootQuery });
