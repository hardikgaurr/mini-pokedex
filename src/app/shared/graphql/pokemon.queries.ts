import { gql } from 'apollo-angular';
import { POKEMON_BASIC_INFO } from './pokemon.fragments';

export const GET_POKEMONS = gql`
  query GetPokemons($limit: Int!, $offset: Int!) {
    pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      order_by: { id: asc }
    ) {
      ...PokemonBasicInfo
    }
  }

  ${POKEMON_BASIC_INFO}
`;

export const GET_POKEMON_BY_ID = gql`
  query GetPokemonById($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      ...PokemonBasicInfo
    }
  }

  ${POKEMON_BASIC_INFO}
`;