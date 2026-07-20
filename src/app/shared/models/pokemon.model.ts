/**
 * Supported Pokémon base stat names returned by the GraphQL API.
 */
export type PokemonStatName =
  'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defense' | 'speed';

/**
 * Pokémon base stat.
 */
export interface PokemonStat {
  readonly name: PokemonStatName;
  readonly value: number;
}

/**
 * Pokémon domain model used throughout the application.
 */
export interface Pokemon {
  readonly id: number;
  readonly name: string;

  readonly height: number;
  readonly weight: number;

  readonly sprite: string;

  readonly types: readonly string[];

  readonly abilities: readonly string[];

  readonly stats: readonly PokemonStat[];
}
