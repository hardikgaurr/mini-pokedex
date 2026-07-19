import { gql } from 'apollo-angular';

export const POKEMON_BASIC_INFO = gql`
  fragment PokemonBasicInfo on pokemon_v2_pokemon {
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