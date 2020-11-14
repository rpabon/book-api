import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import { GraphQLField } from '../models/GraphQLField';
import { Book } from '../models/Book';

export const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: (): GraphQLField<Book> => ({
    id: { type: GraphQLInt },
    author_id: { type: GraphQLInt },
    author: { type: GraphQLString },
    title: { type: GraphQLString },
    rating: { type: GraphQLInt },
    image_url: { type: GraphQLString },
    small_image_url: { type: GraphQLString },
    isbn: { type: GraphQLInt },
    description: { type: GraphQLString },
    num_pages: { type: GraphQLInt },
    author_image_url: { type: GraphQLString },
    similar_books: { type: new GraphQLList(BookType) },
    year: { type: GraphQLInt },
  }),
});
