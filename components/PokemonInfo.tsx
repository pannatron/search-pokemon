'use client';

import { useQuery } from '@apollo/client';
import { useCallback, memo } from 'react';
import { GET_POKEMON } from '../graphql/queries';
import { Attack, Evolution, PokemonData, PokemonVars } from '../graphql/types';

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
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image and Basic Info */}
        <div className="md:w-1/3">
          <img 
            src={pokemon.image} 
            alt={pokemon.name}
            className="w-full h-auto rounded-lg shadow-sm mb-4"
          />
          <h1 className="text-2xl font-bold text-center mb-2 text-blue-600">{pokemon.name}</h1>
          <p className="text-gray-600 text-center">#{pokemon.number}</p>
          <p className="text-gray-700 text-center italic mb-2">{pokemon.classification}</p>
        </div>

        {/* Stats and Details */}
        <div className="md:w-2/3">
          {/* Basic Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-3 rounded">
              <h3 className="font-semibold text-gray-700">Height</h3>
              <p className="text-gray-600">{pokemon.height.minimum} - {pokemon.height.maximum}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <h3 className="font-semibold text-gray-700">Weight</h3>
              <p className="text-gray-600">{pokemon.weight.minimum} - {pokemon.weight.maximum}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <h3 className="font-semibold text-gray-700">Max CP</h3>
              <p className="text-gray-600">{pokemon.maxCP}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <h3 className="font-semibold text-gray-700">Max HP</h3>
              <p className="text-gray-600">{pokemon.maxHP}</p>
            </div>
          </div>

          {/* Types and Resistances */}
          <div className="mb-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Types</h2>
              <div className="flex flex-wrap gap-2">
                {pokemon.types.map(type => (
                  <span key={type} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {type}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Resistant to</h2>
                <div className="flex flex-wrap gap-2">
                  {pokemon.resistant.map(type => (
                    <span key={type} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Weaknesses</h2>
                <div className="flex flex-wrap gap-2">
                  {pokemon.weaknesses.map(type => (
                    <span key={type} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Attacks */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Attacks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2 text-gray-700">Fast Attacks</h3>
                <ul className="space-y-2">
                  {pokemon.attacks.fast.map((attack: Attack) => (
                    <li key={attack.name} className="bg-gray-50 p-2 rounded">
                      <span className="font-medium">{attack.name}</span>
                      <span className="text-gray-600"> - {attack.damage} damage</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-gray-700">Special Attacks</h3>
                <ul className="space-y-2">
                  {pokemon.attacks.special.map((attack: Attack) => (
                    <li key={attack.name} className="bg-gray-50 p-2 rounded">
                      <span className="font-medium">{attack.name}</span>
                      <span className="text-gray-600"> - {attack.damage} damage</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Evolution Information */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Evolution</h2>
            {pokemon.evolutionRequirements && (
              <p className="text-gray-700 mb-2">
                Requires {pokemon.evolutionRequirements.amount} {pokemon.evolutionRequirements.name}
              </p>
            )}
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
      </div>
    </div>
  );
};

export default memo(PokemonInfo);
