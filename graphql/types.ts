export interface FastAttack {
  name: string;
  damage: number;
}

export interface Evolution {
  name: string;
}

export interface Pokemon {
  id: string;
  name: string;
  types: string[];
  attacks: {
    fast: FastAttack[];
  };
  evolutions: Evolution[] | null;
}

export interface PokemonData {
  pokemon: Pokemon | null;
}

export interface PokemonVars {
  name: string;
}
