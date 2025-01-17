'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import SearchBox from '../../components/SearchBox';
import { useRouter } from 'next/navigation';
import SearchParamsWrapper from '../../components/SearchParamsWrapper';

const PokemonInfo = dynamic(() => import('../../components/PokemonInfo'), {
  loading: () => (
    <div className="p-6 bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-primary-purple/20 max-w-[1200px] mx-auto shadow-glow">
      <div className="animate-pulse flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/4">
          <div className="aspect-square bg-gray-700/50 rounded-xl mb-4"></div>
          <div className="h-8 bg-gray-700/50 rounded-lg w-3/4 mx-auto mb-4"></div>
        </div>
        <div className="lg:w-3/4">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="flex-1 h-8 bg-gray-700/50 rounded"></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
});

import { PokemonData } from '../../graphql/types';

interface HomeProps {
  initialPokemon?: string;
  initialData?: PokemonData;
}

export default function Home({ initialPokemon, initialData }: HomeProps) {
  const router = useRouter();
  const [searchedPokemon, setSearchedPokemon] = useState<string | null>(initialPokemon || null);
  
  const handleSearchParams = useCallback((name: string | null) => {
    if (!searchedPokemon) {
      setSearchedPokemon(name);
    }
  }, [searchedPokemon]);
  
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
        initialValue={searchedPokemon || initialPokemon || ''} 
      />
    </div>
  ), [handleSearch, searchedPokemon, initialPokemon]);

  // Render back button without memoization to ensure consistent hydration
  const backButton = history.length > 0 ? (
    <button
      onClick={handleBack}
      className="px-6 py-3 bg-gradient-to-r from-primary-purple to-primary-pink 
                text-white rounded-xl flex items-center gap-2 
                transition-all duration-300 shadow-glow-sm
                hover:shadow-glow hover:-translate-y-1
                focus:outline-none focus:ring-2 focus:ring-primary-pink/50
                active:scale-95 group"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 transition-transform duration-300 transform group-hover:-translate-x-1" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
      </svg>
      <span>Back</span>
    </button>
  ) : null;

  return (
    <>
    <SearchParamsWrapper onSearchParams={handleSearchParams} />
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="text-center mb-16 space-y-6 animate-float">
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-purple to-primary-pink rounded-2xl blur opacity-25 group-hover:opacity-40 transition-all duration-300 animate-pulse"></div>
            <h1 className="relative text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-purple to-primary-pink animate-shine">
              Search Pokém<Image src="/ball.gif" alt="o" width={72} height={72} className="inline-block" />n
            </h1>
          </div>
          <p className="text-gray-300 text-xl font-medium">
            Discover detailed information about your favorite Pokémon
          </p>
        </div>
        
        <div className="flex gap-4 items-center mb-12 animate-float" style={{ animationDelay: '0.1s' }}>
          <div className="flex-shrink-0">
            {backButton}
          </div>
          {searchBox}
        </div>
      
        {!searchedPokemon ? (
          <div className="text-center py-16 bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-primary-purple/20 shadow-glow transition-all duration-300 hover:shadow-glow-lg">
            <div className="max-w-md mx-auto">
              <Image 
                src="/pokeball.png" 
                alt="Pokeball" 
                width={128}
                height={128}
                className="mx-auto mb-8 opacity-50 animate-float"
              />
              <p className="text-xl text-gray-300 font-medium">
                Enter a Pokémon name above to see detailed information
              </p>
            </div>
          </div>
        ) : (
          <div className="relative backdrop-blur-sm">
            <PokemonInfo 
              key={searchedPokemon} // Force remount on new search
              name={searchedPokemon}
              initialData={initialData}
              onSelectEvolution={handleSearch} 
            />
            <div 
              className="absolute inset-0 flex items-center justify-center bg-gray-800/90"
              style={{ 
                display: searchedPokemon ? 'none' : 'flex',
                animation: 'fadeIn 0.3s ease-in-out'
              }}
            >
              <div className="text-center p-6 bg-gray-800/50 backdrop-blur-lg rounded-xl border border-red-500/30 shadow-glow">
                <h2 className="text-2xl font-semibold text-red-400 mb-3">
                </h2>
                <p className="text-lg text-gray-300">
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </main>
    </>
  );
}
