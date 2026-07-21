import { Pokemon, PokemonStatName } from '../../shared/models/pokemon.model';

/**
 * Shape of the sprite JSON returned by the PokéAPI.
 */
interface PokemonSprites {
  front_default?: string;
}

/**
 * Safely parses the sprite payload returned by the GraphQL API.
 */
function parseSprites(spriteData: unknown): PokemonSprites {
  if (!spriteData) {
    return {};
  }

  if (typeof spriteData === 'object') {
    return spriteData as PokemonSprites;
  }

  if (typeof spriteData === 'string') {
    try {
      return JSON.parse(spriteData) as PokemonSprites;
    } catch {
      return {};
    }
  }

  return {};
}

/**
 * Maps the GraphQL Pokémon list response into domain models.
 */
export function mapPokemonList(response: any): Pokemon[] {
  const pokemons = response?.data?.pokemon_v2_pokemon ?? [];

  return pokemons.map((pokemon: any): Pokemon => {
    const sprites = parseSprites(pokemon.pokemon_v2_pokemonsprites?.[0]?.sprites);

    return {
      id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,

      sprite: sprites.front_default ?? '',

      types: pokemon.pokemon_v2_pokemontypes?.map((type: any) => type.pokemon_v2_type.name) ?? [],

      // List query doesn't include abilities.
      abilities:
        pokemon.pokemon_v2_pokemonabilities?.map(
          (ability: any) => ability.pokemon_v2_ability.name,
        ) ?? [],

      stats:
        pokemon.pokemon_v2_pokemonstats?.map((stat: any) => ({
          name: stat.pokemon_v2_stat.name as PokemonStatName,
          value: stat.base_stat,
        })) ?? [],
    };
  });
}
