'use client';

import { ApolloProvider } from '@apollo/client';
import { getClient } from '../graphql/client';
import { useMemo } from 'react';

export default function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => getClient(), []);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
