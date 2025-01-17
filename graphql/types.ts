export interface Attack {
  name: string;
  damage: number;
}

export interface Attacks {
  fast: Attack[];
  special: Attack[];
}

export interface Evolution {
  name: string;
}

export interface Weight {
  minimum: string;
  maximum: string;
}

export interface Height {
  minimum: string;
  maximum: string;
}

export interface EvolutionRequirements {
  amount: number;
  name: string;
}

export interface Pokemon {
  id: string;
  number: string;
  name: string;
  weight: Weight;
  height: Height;
  classification: string;
  types: string[];
  resistant: string[];
  attacks: Attacks;
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  evolutions: Evolution[] | null;
  evolutionRequirements: EvolutionRequirements | null;
  image: string;
}

export interface PokemonData {
  pokemon: Pokemon | null;
}

export interface PokemonVars {
  name: string;
}
