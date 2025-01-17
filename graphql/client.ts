import { ApolloClient, InMemoryCache, defaultDataIdFromObject } from '@apollo/client';

const cache = new InMemoryCache({
  typePolicies: {
    Pokemon: {
      // Unique identifier for Pokemon type
      keyFields: ['id', 'name'],
      fields: {
        // Field-level policies
        types: {
          // Array fields should be merged rather than overwritten
          merge: true,
        },
        attacks: {
          merge: true,
        },
        evolutions: {
          merge: true,
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
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
    },
    query: {
      fetchPolicy: 'cache-first',
      // Retry failed requests
      errorPolicy: 'all',
    },
  },
});

export default client;
