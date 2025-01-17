import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

let client: ApolloClient<NormalizedCacheObject> | undefined;

const createApolloClient = () => {
  return new ApolloClient({
    uri: 'https://graphql-pokemon2.vercel.app/',
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            pokemon: {
              keyArgs: ['name'],
              merge: true,
            },
          },
        },
      },
    }),
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
    ssrMode: typeof window === 'undefined', // Enable SSR mode when running on server
  });
};

export function getClient() {
  // Create a new client for SSR
  if (typeof window === 'undefined') {
    return createApolloClient();
  }

  // Reuse client on the client-side
  if (!client) {
    client = createApolloClient();
  }

  return client;
}
