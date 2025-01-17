import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://graphql-pokemon2.vercel.app/', // URL ของ GraphQL Pokémon API
  cache: new InMemoryCache(),
});

export default client;
