'use client';

import { useQuery } from '@apollo/client';
import { useCallback, memo } from 'react';
import { GET_POKEMON } from '../graphql/queries';
import { Attack, Evolution, PokemonData, PokemonVars } from '../graphql/types';
import { getTypeColor } from '../utils/typeColors';

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
    fetchPolicy: 'network-only',
    onError: (error) => {
      console.error('Pokemon query error:', error);
    }
  });

  if (loading) return (
    <div className="p-8 bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-primary-purple/20 max-w-[1200px] mx-auto shadow-glow">
      <div className="animate-pulse flex gap-8">
        <div className="w-48 shrink-0">
          <div className="aspect-square bg-gray-700/50 rounded-xl mb-4"></div>
          <div className="h-8 bg-gray-700/50 rounded-lg w-3/4 mx-auto mb-4"></div>
        </div>
        <div className="flex flex-wrap gap-8 justify-between">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-[300px] min-h-[300px] bg-gray-700/50 rounded-xl"></div>
          ))}
        </div>
      </div>
    </div>
  );
  
  if (error || (!loading && !data?.pokemon)) {
    return (
      <div className="p-8 bg-gray-800/30 backdrop-blur-lg rounded-2xl border-2 border-red-500/30 max-w-[1200px] mx-auto shadow-glow">
        <div className="text-center space-y-4">
          <h2 className="text-lg font-semibold text-red-400">Pokemon Not Found</h2>
          <p className="text-gray-300">No Pokemon found with the name "{name}"</p>
        </div>
      </div>
    );
  }

  const pokemon = data!.pokemon!;

  return (
    <div className="p-8 bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-primary-purple/20 max-w-[1200px] mx-auto shadow-glow">
      <div className="flex gap-8">
        {/* Left Side - Image and Basic Info */}
        <div className="w-48 shrink-0">
          <div className="sticky top-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-purple to-primary-pink rounded-2xl blur opacity-25 group-hover:opacity-70 transition-all duration-300 animate-pulse"></div>
              <div className="relative">
                <img 
                  src={pokemon.image} 
                  alt={pokemon.name}
                  className="w-full h-auto rounded-xl shadow-glow mb-6 transform group-hover:scale-105 transition-all duration-300"
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-primary-purple to-primary-pink bg-clip-text text-transparent animate-shine">
              {pokemon.name}
            </h1>
            <div className="flex flex-col gap-3">
              <span className="px-4 py-2 bg-gray-800/50 rounded-full text-gray-300 text-sm font-medium hover:bg-gray-700/50 transition-colors duration-200 text-center">
                #{pokemon.number}
              </span>
              <span className="px-4 py-2 bg-primary-purple/20 rounded-full text-primary-purple text-sm font-medium hover:bg-primary-purple/30 transition-colors duration-200 text-center">
                {pokemon.classification}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Stats */}
        <div className="flex-1">
          <div className="flex flex-wrap gap-8">
            {/* Combat Stats */}
            <div className="group flex-1 min-w-[300px] min-h-[300px] bg-gray-800/30 rounded-xl border border-primary-purple/20 hover:shadow-glow transition-all duration-300 overflow-hidden hover:border-primary-purple/40">
              <div className="bg-gradient-to-r from-primary-purple/20 via-primary-pink/20 to-primary-purple/20 px-5 py-3 border-b border-primary-purple/20">
                <h3 className="font-bold text-primary-pink text-center text-base tracking-wide">Combat Stats</h3>
              </div>
              <div className="p-4 space-y-3 h-full flex flex-col">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center py-3 px-4 bg-gray-900/50 rounded-lg shadow-glow-sm border border-primary-purple/20">
                    <div className="text-gray-300 text-xs uppercase tracking-wide font-semibold">HP</div>
                    <div className="text-xl font-bold text-primary-purple leading-tight">{pokemon.maxHP}</div>
                  </div>
                  <div className="text-center py-3 px-4 bg-gray-900/50 rounded-lg shadow-glow-sm border border-primary-purple/20">
                    <div className="text-gray-300 text-xs uppercase tracking-wide font-semibold">CP</div>
                    <div className="text-xl font-bold text-primary-purple leading-tight">{pokemon.maxCP}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center py-3 px-3 bg-gray-900/50 rounded-lg shadow-glow-sm border border-primary-purple/20">
                    <div className="text-gray-300 text-xs uppercase tracking-wide font-semibold">Height</div>
                    <div className="text-sm font-bold text-primary-purple leading-tight">
                      {pokemon.height.minimum}
                    </div>
                  </div>
                  <div className="text-center py-3 px-3 bg-gray-900/50 rounded-lg shadow-glow-sm border border-primary-purple/20">
                    <div className="text-gray-300 text-xs uppercase tracking-wide font-semibold">Weight</div>
                    <div className="text-sm font-bold text-primary-purple leading-tight">
                      {pokemon.weight.minimum}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Type Information */}
            <div className="group flex-1 min-w-[300px] min-h-[300px] bg-gray-800/30 rounded-xl border border-primary-purple/20 hover:shadow-glow transition-all duration-300 overflow-hidden hover:border-primary-purple/40">
              <div className="bg-gradient-to-r from-primary-purple/20 via-primary-pink/20 to-primary-purple/20 px-5 py-3 border-b border-primary-purple/20">
                <h3 className="font-bold text-primary-pink text-center text-base tracking-wide">Type Information</h3>
              </div>
              <div className="p-4 space-y-3 h-full flex flex-col">
                <div className="text-center py-3 px-4 bg-gray-900/50 rounded-lg shadow-glow-sm">
                  <div className="text-gray-300 text-xs uppercase tracking-wide font-semibold mb-2">Types</div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {pokemon.types.map((type: string) => {
                      const colors = getTypeColor(type);
                      return (
                        <span 
                          key={type} 
                          className={`px-3 py-1.5 ${colors.bg}/80 text-white rounded text-sm font-bold shadow-glow hover:${colors.bg} hover:shadow-glow-lg transition-all duration-300`}
                        >
                          {type}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="text-center py-3 px-4 bg-gray-900/50 rounded-lg shadow-glow-sm">
                  <div className="text-gray-300 text-xs uppercase tracking-wide font-semibold mb-2">Weaknesses</div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {pokemon.weaknesses.map((type: string) => {
                      const colors = getTypeColor(type);
                      return (
                        <span 
                          key={type} 
                          className={`px-3 py-1.5 ${colors.bg}/80 text-white rounded text-sm font-bold shadow-glow hover:${colors.bg} hover:shadow-glow-lg transition-all duration-300`}
                        >
                          {type}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Attacks Section */}
            <div className="group flex-1 min-w-[300px] min-h-[300px] bg-gray-800/30 rounded-xl border border-primary-purple/20 hover:shadow-glow transition-all duration-300 overflow-hidden hover:border-primary-purple/40">
              <div className="bg-gradient-to-r from-primary-purple/20 via-primary-pink/20 to-primary-purple/20 px-5 py-3 border-b border-primary-purple/20">
                <h3 className="font-bold text-primary-pink text-center text-base tracking-wide">Attack Moves</h3>
              </div>
              <div className="p-4 space-y-3 h-full flex flex-col">
                <div>
                  <div className="text-gray-300 text-xs uppercase tracking-wide font-semibold mb-2 text-center">Fast</div>
                  <div className="space-y-2">
                    {pokemon.attacks.fast.slice(0, 2).map((attack: Attack) => (
                      <div key={attack.name} className="flex justify-between items-center py-2 px-4 bg-gray-900/50 hover:bg-gray-800/50 rounded-lg transition-all duration-300 border border-primary-purple/20 shadow-glow-sm hover:shadow-glow group/attack">
                        <span className="text-white font-semibold text-sm group-hover/attack:text-primary-pink transition-colors duration-300">{attack.name}</span>
                        <span className="text-base text-primary-pink font-bold tabular-nums">{attack.damage}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-gray-300 text-xs uppercase tracking-wide font-semibold mb-2 text-center">Special</div>
                  <div className="space-y-2">
                    {pokemon.attacks.special.slice(0, 2).map((attack: Attack) => (
                      <div key={attack.name} className="flex justify-between items-center py-2 px-4 bg-gray-900/50 hover:bg-gray-800/50 rounded-lg transition-all duration-300 border border-primary-purple/20 shadow-glow-sm hover:shadow-glow group/attack">
                        <span className="text-white font-semibold text-sm group-hover/attack:text-primary-pink transition-colors duration-300">{attack.name}</span>
                        <span className="text-base text-primary-pink font-bold tabular-nums">{attack.damage}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Evolution Chain */}
          <div className="group mt-8 bg-gray-800/30 rounded-xl border border-primary-purple/20 hover:shadow-glow transition-all duration-300 overflow-hidden hover:border-primary-purple/40">
            <div className="bg-gradient-to-r from-primary-purple/20 via-primary-pink/20 to-primary-purple/20 px-5 py-3 border-b border-primary-purple/20">
              <h3 className="font-bold text-primary-pink text-center text-base tracking-wide">Evolution Chain</h3>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <div className="text-gray-300 text-xs uppercase tracking-wide font-semibold mb-2 text-center">Requirements</div>
                {pokemon.evolutionRequirements ? (
                  <div className="text-center py-3 px-4 bg-gray-900/50 rounded-lg shadow-glow-sm border border-primary-purple/20">
                    <div className="text-sm font-bold text-primary-purple">
                      {pokemon.evolutionRequirements.amount} {pokemon.evolutionRequirements.name}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-3 px-4 bg-gray-900/50 rounded-lg shadow-glow-sm border border-primary-purple/20">
                    <span className="text-gray-400 font-medium text-sm">No requirements</span>
                  </div>
                )}
              </div>
              <div>
                <div className="text-gray-300 text-xs uppercase tracking-wide font-semibold mb-2 text-center">Evolves To</div>
                {pokemon.evolutions && pokemon.evolutions.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {pokemon.evolutions.map((evo: Evolution) => (
                      <div 
                        key={evo.name}
                        onClick={() => handleEvolutionClick(evo.name)}
                        className="text-center py-3 px-4 cursor-pointer bg-gray-900/50 hover:bg-gray-800/50 rounded-lg transition-all duration-300 border border-primary-purple/20 shadow-glow-sm hover:shadow-glow group/evo"
                      >
                        <div className="text-sm font-bold text-primary-purple group-hover/evo:text-primary-pink transition-colors duration-300">{evo.name}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-3 px-4 bg-gray-900/50 rounded-lg shadow-glow-sm border border-primary-purple/20">
                    <span className="text-gray-400 font-medium text-sm">No evolutions available</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PokemonInfo);
