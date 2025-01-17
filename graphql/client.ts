import { ApolloClient, InMemoryCache, defaultDataIdFromObject } from '@apollo/client';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        pokemon: {
          merge: false,
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'https://graphql-pokemon2.vercel.app/',
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first', 
      nextFetchPolicy: 'cache-first',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
  },
});

export default client;
