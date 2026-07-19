import { Pokemon } from '../../shared/models/pokemon.model';

export function mapPokemonList(response: any): Pokemon[] {
  const pokemons = response?.data?.pokemon_v2_pokemon ?? [];

  return pokemons.map((pokemon: any) => {
    const spriteData = pokemon.pokemon_v2_pokemonsprites?.[0]?.sprites;

    const sprites = typeof spriteData === 'string' ? JSON.parse(spriteData) : (spriteData ?? {});

    return {
      id: pokemon.id,

      name: pokemon.name,

      height: pokemon.height,

      weight: pokemon.weight,

      sprite: sprites.front_default ?? '',

      types: pokemon.pokemon_v2_pokemontypes.map((type: any) => type.pokemon_v2_type.name),

      abilities: pokemon.pokemon_v2_pokemonabilities.map(
        (ability: any) => ability.pokemon_v2_ability.name,
      ),

      stats: pokemon.pokemon_v2_pokemonstats.map((stat: any) => ({
        name: stat.pokemon_v2_stat.name,
        value: stat.base_stat,
      })),
    };
  });
}
