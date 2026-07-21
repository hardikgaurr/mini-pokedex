import { Injectable, inject } from '@angular/core';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  shareReplay,
} from 'rxjs';

import { PokemonStore } from './pokemon.store';
import { PokemonState } from './pokemon.state';

@Injectable({
  providedIn: 'root',
})
export class PokemonSelectors {
  private readonly store = inject(PokemonStore);

  private select<T>(project: (state: PokemonState) => T): Observable<T> {
    return this.store.state$.pipe(
      map(project),
      distinctUntilChanged(),
      shareReplay({
        bufferSize: 1,
        refCount: true,
      }),
    );
  }

  readonly pokemons$ = this.select((state) => state.pokemons);

  readonly team$ = this.select((state) => state.team);

  readonly loading$ = this.select((state) => state.loading);

  readonly error$ = this.select((state) => state.error);

  readonly selectedPokemon$ = this.select((state) => state.selectedPokemon);

  readonly searchTerm$ = this.select((state) => state.searchTerm).pipe(
    debounceTime(250),
    shareReplay({
      bufferSize: 1,
      refCount: true,
    }),
  );

  readonly typeFilter$ = this.select((state) => state.typeFilter);

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
    shareReplay({
      bufferSize: 1,
      refCount: true,
    }),
  );
}
