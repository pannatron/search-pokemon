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
      fetchPolicy: 'network-only', // Always fetch fresh data
      nextFetchPolicy: 'cache-first',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
});

export default client;
