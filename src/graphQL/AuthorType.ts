import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
} from 'graphql';
import { GraphQLField } from '../models/GraphQLField';
import { Author } from '../models/Author';
import { BookType } from './BookType';

export const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: (): GraphQLField<Author> => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    large_image_url: { type: GraphQLString },
    image_url: { type: GraphQLString },
    small_image_url: { type: GraphQLString },
    about: { type: GraphQLString },
    hometown: { type: GraphQLString },
    born_at: { type: GraphQLString },
    died_at: { type: GraphQLString },
    books: { type: new GraphQLList(BookType) },
  }),
});
