import { Injectable, inject } from '@angular/core';
import { distinctUntilChanged, map } from 'rxjs/operators';

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
}
