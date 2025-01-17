'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SearchBox from '../../components/SearchBox';
import { useSearchParams, useRouter } from 'next/navigation';

const PokemonInfo = dynamic(() => import('../../components/PokemonInfo'), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchedPokemon, setSearchedPokemon] = useState<string | null>(
    searchParams.get('name')
  );
  const [history, setHistory] = useState<string[]>([]);

  const handleSearch = (name: string) => {
    if (searchedPokemon) {
      setHistory(prev => [...prev, searchedPokemon]);
    }
    setSearchedPokemon(name);
    router.push(`?name=${encodeURIComponent(name)}`);
  };

  const handleBack = () => {
    if (history.length > 0) {
      const previousPokemon = history[history.length - 1];
      setSearchedPokemon(previousPokemon);
      setHistory(prev => prev.slice(0, -1));
      router.push(`?name=${encodeURIComponent(previousPokemon)}`);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Search Pokémon
      </h1>
      
      <div className="flex gap-4 items-center mb-6">
        {history.length > 0 && (
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
        )}
        <div className="flex-1">
          <SearchBox onSearch={handleSearch} initialValue={searchParams.get('name') || ''} />
        </div>
      </div>
      
      {searchedPokemon && <PokemonInfo name={searchedPokemon} onSelectEvolution={handleSearch} />}
      
      {!searchedPokemon && (
        <p className="text-center text-gray-600">
          Enter a Pokémon name to see its details
        </p>
      )}
    </main>
  );
}
