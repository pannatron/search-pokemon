import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GET_POKEMON } from '../../../../graphql/queries';
import { PokemonData } from '../../../../graphql/types';
import { redirect } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import Home from '../../page';

// Initialize Apollo Client for server-side operations
const client = new ApolloClient({
  uri: 'https://graphql-pokemon2.vercel.app/',
  cache: new InMemoryCache(),
});

type Props = {
  params: { name: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

// Generate metadata for SEO
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const name = await Promise.resolve(params.name);

  return {
    title: `${name} - Pokemon Info`,
    description: `View information about ${name}, including types, attacks, and evolutions.`,
  };
}

// Implement ISR with revalidation every hour
export const revalidate = 3600;

// Generate static params for common Pokemon
export async function generateStaticParams() {
  // Starter Pokemon from different generations
  const starterPokemon = [
    'Bulbasaur', 'Charmander', 'Squirtle',  // Gen 1
    'Chikorita', 'Cyndaquil', 'Totodile',   // Gen 2
    'Treecko', 'Torchic', 'Mudkip',         // Gen 3
  ];

  // Popular and iconic Pokemon
  const popularPokemon = [
    'Pikachu', 'Charizard', 'Mewtwo',
    'Gyarados', 'Dragonite', 'Snorlax',
    'Gengar', 'Eevee', 'Lucario',
  ];

  // Pokemon with interesting evolution chains
  const evolutionPokemon = [
    'Eevee',    // Multiple evolutions
    'Magikarp', // Dramatic evolution
    'Dratini',  // 3-stage dragon evolution
    'Ralts',    // Branching evolution
  ];

  // Combine all Pokemon and remove duplicates
  const allPokemon = [...new Set([
    ...starterPokemon,
    ...popularPokemon,
    ...evolutionPokemon
  ])];
  
  return allPokemon.map((name) => ({
    name: name.toLowerCase(),
  }));
}

export default async function PokemonPage({ params }: Props) {
  const pokemonName = await Promise.resolve(params.name);
  
  try {
    // Server-side data fetching
    const { data } = await client.query<PokemonData>({
      query: GET_POKEMON,
      variables: { name: pokemonName },
    });

    if (!data.pokemon) {
      redirect('/?error=not_found&name=' + encodeURIComponent(pokemonName));
    }

    // Return the client-side Home component with the pre-fetched name
    return <Home initialPokemon={pokemonName} />;
  } catch (error) {
    redirect('/?error=not_found&name=' + encodeURIComponent(pokemonName));
  }
}
