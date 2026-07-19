import { Pokemon } from '../../shared/models/pokemon.model';

export interface Team {
  id: string;
  name: string;

  pokemons: Pokemon[];
}
