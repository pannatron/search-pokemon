'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import SearchBox from '../../components/SearchBox';

const PokemonInfo = dynamic(() => import('../../components/PokemonInfo'), {
  ssr: false,
});

export default function Home() {
  const [searchedPokemon, setSearchedPokemon] = useState<string | null>(null);

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Search Pokémon
      </h1>
      
      <SearchBox onSearch={setSearchedPokemon} />
      
      {searchedPokemon && <PokemonInfo name={searchedPokemon} />}
      
      {!searchedPokemon && (
        <p className="text-center text-gray-600">
          Enter a Pokémon name to see its details
        </p>
      )}
    </main>
  );
}
