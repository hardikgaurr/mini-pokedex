import { Pokemon } from '../../shared/models/pokemon.model';

export interface PokemonState {
  pokemons: Pokemon[];
  selectedPokemon: Pokemon | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  team: Pokemon[];
}

export const initialPokemonState: PokemonState = {
  pokemons: [],
  selectedPokemon: null,
  loading: false,
  error: null,
  searchTerm: '',
  team: [],
};
