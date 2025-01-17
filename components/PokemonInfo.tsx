'use client';

import { useQuery } from '@apollo/client';
import { useCallback, memo } from 'react';
import { GET_POKEMON } from '../graphql/queries';
import { FastAttack, Evolution, PokemonData, PokemonVars } from '../graphql/types';

interface PokemonInfoProps {
  name: string;
  onSelectEvolution: (name: string) => void;
}

const PokemonInfo = ({ name, onSelectEvolution }: PokemonInfoProps) => {
  const handleEvolutionClick = useCallback((evoName: string) => {
    onSelectEvolution(evoName);
  }, [onSelectEvolution]);
  const { data, loading, error } = useQuery<PokemonData, PokemonVars>(GET_POKEMON, {
    variables: { name },
    // Ensure we get fresh data and handle errors appropriately
    fetchPolicy: 'network-only',
    onError: (error) => {
      console.error('Pokemon query error:', error);
    }
  });

  if (loading) return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
          <div className="text-center text-gray-500">Loading...</div>
      </div>
    </div>
  );
  
  if (error || (!loading && !data?.pokemon)) {
    return (
      <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md border-2 border-red-200">
        <div className="text-center">
          <p className="text-lg text-gray-800">
            Pokemon name "{name}" not found
          </p>
        </div>
      </div>
    );
  }

  const pokemon = data!.pokemon!;

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">{pokemon.name}</h1>
      <div className="mb-4">
        <p className="text-gray-700">Types: {pokemon.types.join(', ')}</p>
      </div>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Fast Attacks</h2>
        <ul className="space-y-2">
          {pokemon.attacks.fast.map((attack: FastAttack) => (
            <li key={attack.name} className="bg-gray-50 p-2 rounded">
              <span className="font-medium">{attack.name}</span>
              <span className="text-gray-600"> - {attack.damage} damage</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Evolutions</h2>
        {pokemon.evolutions?.length ? (
          <ul className="space-y-1">
            {pokemon.evolutions.map((evo: Evolution) => (
              <li 
                key={evo.name}
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
                onClick={() => handleEvolutionClick(evo.name)}
              >
                {evo.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No evolutions available.</p>
        )}
      </div>
    </div>
  );
};

export default memo(PokemonInfo);
