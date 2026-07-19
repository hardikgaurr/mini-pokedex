import { Injectable, inject } from '@angular/core';
import { combineLatest, map, distinctUntilChanged } from 'rxjs';

import { PokemonStore } from './pokemon.store';

@Injectable({
  providedIn: 'root',
})
export class PokemonSelectors {
  private readonly store = inject(PokemonStore);

  readonly pokemons$ = this.store.state$.pipe(
    map((state) => state.pokemons),
    distinctUntilChanged(),
  );

  readonly loading$ = this.store.state$.pipe(
    map((state) => state.loading),
    distinctUntilChanged(),
  );

  readonly error$ = this.store.state$.pipe(
    map((state) => state.error),
    distinctUntilChanged(),
  );

  readonly selectedPokemon$ = this.store.state$.pipe(
    map((state) => state.selectedPokemon),
    distinctUntilChanged(),
  );

  readonly searchTerm$ = this.store.state$.pipe(
    map((state) => state.searchTerm),
    distinctUntilChanged(),
  );

  readonly filteredPokemons$ = combineLatest([this.pokemons$, this.searchTerm$]).pipe(
    map(([pokemons, term]) => {
      if (!term.trim()) return pokemons;

      const search = term.toLowerCase();

      return pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(search));
    }),
  );
}
