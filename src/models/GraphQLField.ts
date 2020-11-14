import { GraphQLOutputType } from 'graphql';

export type GraphQLField<T> = {
  [K in keyof T]: {
    type: GraphQLOutputType;
  };
};
