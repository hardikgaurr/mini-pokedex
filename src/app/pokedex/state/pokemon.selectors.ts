import { Injectable, inject } from '@angular/core';
import { combineLatest, distinctUntilChanged, map, shareReplay } from 'rxjs';

import { PokemonStore } from './pokemon.store';

@Injectable({
  providedIn: 'root',
})
export class PokemonSelectors {
  private readonly store = inject(PokemonStore);

  readonly pokemons$ = this.store.state$.pipe(
    map((state) => state.pokemons),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly team$ = this.store.state$.pipe(
    map((state) => state.team),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly loading$ = this.store.state$.pipe(
    map((state) => state.loading),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly error$ = this.store.state$.pipe(
    map((state) => state.error),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly selectedPokemon$ = this.store.state$.pipe(
    map((state) => state.selectedPokemon),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly searchTerm$ = this.store.state$.pipe(
    map((state) => state.searchTerm),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly typeFilter$ = this.store.state$.pipe(
    map((state) => state.typeFilter),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly filteredPokemons$ = combineLatest([
    this.pokemons$,
    this.searchTerm$,
    this.typeFilter$,
  ]).pipe(
    map(([pokemons, searchTerm, typeFilter]) => {
      const search = searchTerm.trim().toLowerCase();
      const selectedType = typeFilter.trim().toLowerCase();

      return pokemons.filter((pokemon) => {
        const matchesSearch = !search || pokemon.name.toLowerCase().includes(search);

        const matchesType =
          !selectedType || pokemon.types.some((type) => type.toLowerCase() === selectedType);

        return matchesSearch && matchesType;
      });
    }),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
}
