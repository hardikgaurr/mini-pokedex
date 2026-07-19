import { map } from 'rxjs/operators';

import { PokemonStore } from './pokemon.store';

export class PokemonSelectors {
  constructor(private readonly store: PokemonStore) {}

  get pokemons$() {
    return this.store.state$.pipe(map((state) => state.pokemons));
  }

  get loading$() {
    return this.store.state$.pipe(map((state) => state.loading));
  }

  get selectedPokemon$() {
    return this.store.state$.pipe(map((state) => state.selectedPokemon));
  }

  get searchTerm$() {
    return this.store.state$.pipe(map((state) => state.searchTerm));
  }
}
