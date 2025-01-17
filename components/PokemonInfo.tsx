'use client';

import { useQuery } from '@apollo/client';
import { GET_POKEMON } from '../graphql/queries';
import { FastAttack, Evolution } from '../graphql/types';

interface PokemonInfoProps {
  name: string;
  onSelectEvolution: (name: string) => void;
}

const PokemonInfo = ({ name, onSelectEvolution }: PokemonInfoProps) => {
  const { data, loading, error } = useQuery(GET_POKEMON, {
    variables: { name },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.pokemon) return <p>Pokemon not found!</p>;

  const { pokemon } = data;

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
              >
                <span 
                  className="text-blue-600 hover:text-blue-800 cursor-pointer hover:underline"
                  onClick={() => onSelectEvolution(evo.name)}
                >
                  {evo.name}
                </span>
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

export default PokemonInfo;
