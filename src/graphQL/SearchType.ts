import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import { BookInfo } from '../models/BookInfo';
import { GraphQLField } from '../models/GraphQLField';

export const SearchType = new GraphQLObjectType({
  name: 'Search',
  fields: (): GraphQLField<BookInfo> => ({
    id: { type: GraphQLInt },
    url: { type: GraphQLString },
    url_small: { type: GraphQLString },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    author_id: { type: GraphQLInt },
    rating: { type: GraphQLInt },
    year: { type: GraphQLInt },
  }),
});
