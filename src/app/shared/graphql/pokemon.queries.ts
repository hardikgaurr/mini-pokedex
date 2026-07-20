import { gql } from 'apollo-angular';

import { POKEMON_DETAILS, POKEMON_LIST_INFO } from './pokemon.fragments';

/**
 * Paginated Pokémon list.
 */
export const GET_POKEMONS = gql`
  query GetPokemons($limit: Int!, $offset: Int!) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset, order_by: { id: asc }) {
      ...PokemonListInfo
    }
  }

  ${POKEMON_LIST_INFO}
`;

/**
 * Fetch a single Pokémon with complete details.
 */
export const GET_POKEMON_BY_ID = gql`
  query GetPokemonById($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      ...PokemonDetails
    }
  }

  ${POKEMON_DETAILS}
`;
