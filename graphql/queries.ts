import { gql } from '@apollo/client';
import { PokemonData, PokemonVars } from './types';
import { TypedDocumentNode } from '@apollo/client';

export const GET_POKEMON: TypedDocumentNode<PokemonData, PokemonVars> = gql`
  query GetPokemon($name: String!) {
    pokemon(name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      attacks {
        fast {
          name
          damage
        }
        special {
          name
          damage
        }
      }
      weaknesses
      fleeRate
      maxCP
      maxHP
      evolutions {
        name
      }
      evolutionRequirements {
        amount
        name
      }
      image
    }
  }
`;
