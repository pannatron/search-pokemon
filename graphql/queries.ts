import { gql } from '@apollo/client';
import { PokemonData, PokemonVars } from './types';
import { TypedDocumentNode } from '@apollo/client';

export const GET_POKEMON: TypedDocumentNode<PokemonData, PokemonVars> = gql`
  query GetPokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      types
      attacks {
        fast {
          name
          damage
        }
      }
      evolutions {
        name
      }
    }
  }
`;
