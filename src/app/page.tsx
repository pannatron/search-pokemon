'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SearchBox from '../../components/SearchBox';
import { useSearchParams, useRouter } from 'next/navigation';

const PokemonInfo = dynamic(() => import('../../components/PokemonInfo'), {
  ssr: false,
});

interface HomeProps {
  initialPokemon?: string;
}

export default function Home({ initialPokemon }: HomeProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchedPokemon, setSearchedPokemon] = useState<string | null>(
    initialPokemon || searchParams.get('name')
  );
  
  // Initialize history from sessionStorage
  const [history, setHistory] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const savedHistory = sessionStorage.getItem('pokemonHistory');
      return savedHistory ? JSON.parse(savedHistory) : [];
    }
    return [];
  });

  // Save history to sessionStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && history.length > 0) {
      sessionStorage.setItem('pokemonHistory', JSON.stringify(history));
    }
  }, [history]);

  // Restore history when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedHistory = sessionStorage.getItem('pokemonHistory');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    }
  }, []);

  const handleSearch = useCallback((name: string) => {
    if (searchedPokemon && searchedPokemon !== name) {
      setHistory(prev => {
        // Avoid duplicate entries
        if (prev[prev.length - 1] !== searchedPokemon) {
          return [...prev, searchedPokemon];
        }
        return prev;
      });
    }
    setSearchedPokemon(name);
    router.push(`/pokemon/${encodeURIComponent(name.toLowerCase())}`);
  }, [searchedPokemon, router]);

  const handleBack = useCallback(() => {
    if (history.length > 0) {
      const previousPokemon = history[history.length - 1];
      setSearchedPokemon(previousPokemon);
      setHistory(prev => prev.slice(0, -1));
      router.push(`/pokemon/${encodeURIComponent(previousPokemon.toLowerCase())}`);
    }
  }, [history, router]);

  // Memoize the search box component to prevent unnecessary re-renders
  const searchBox = useMemo(() => (
    <div className="flex-1">
      <SearchBox 
        onSearch={handleSearch} 
        initialValue={searchParams.get('name') || initialPokemon || ''} 
      />
    </div>
  ), [handleSearch, searchParams, initialPokemon]);

  // Render back button without memoization to ensure consistent hydration
  const backButton = history.length > 0 ? (
    <button
      onClick={handleBack}
      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2 transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
      </svg>
      Back
    </button>
  ) : null;

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Search Pokémon
      </h1>
      
      <div className="flex gap-4 items-center mb-6">
        <div className="flex-shrink-0">
          {backButton}
        </div>
        {searchBox}
      </div>
      
      {!searchedPokemon ? (
        <p className="text-center text-gray-600">
          Enter a Pokémon name to see its details
        </p>
      ) : (
        <div className="relative">
          <PokemonInfo 
            key={searchedPokemon} // Force remount on new search
            name={searchedPokemon} 
            onSelectEvolution={handleSearch} 
          />
          <div 
            className="absolute inset-0 flex items-center justify-center bg-white/80"
            style={{ 
              display: searchedPokemon ? 'none' : 'flex',
              animation: 'fadeIn 0.3s ease-in-out'
            }}
          >
            <div className="text-center p-4 bg-yellow-50 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-yellow-700 mb-2">
                ไม่พบโปเกม่อน
              </h2>
              <p className="text-yellow-600">
                กรุณาลองค้นหาใหม่อีกครั้ง
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </main>
  );
}
