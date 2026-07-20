import { gql } from 'apollo-angular';

/**
 * Fields required for rendering the Pokédex table.
 */
export const POKEMON_LIST_INFO = gql`
  fragment PokemonListInfo on pokemon_v2_pokemon {
    id
    name
    height
    weight

    pokemon_v2_pokemonsprites(limit: 1) {
      sprites
    }

    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
    }

    pokemon_v2_pokemonstats {
      base_stat

      pokemon_v2_stat {
        name
      }
    }
  }
`;

/**
 * Fields required for the Pokémon detail drawer.
 */
export const POKEMON_DETAILS = gql`
  fragment PokemonDetails on pokemon_v2_pokemon {
    id
    name
    height
    weight

    pokemon_v2_pokemonsprites(limit: 1) {
      sprites
    }

    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
    }

    pokemon_v2_pokemonabilities {
      pokemon_v2_ability {
        name
      }
    }

    pokemon_v2_pokemonstats {
      base_stat

      pokemon_v2_stat {
        name
      }
    }
  }
`;
