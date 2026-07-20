import { Injectable, inject } from '@angular/core';
import { combineLatest, distinctUntilChanged, map } from 'rxjs';

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

  readonly team$ = this.store.state$.pipe(
    map((state) => state.team),
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

  readonly typeFilter$ = this.store.state$.pipe(
    map((state) => state.typeFilter),
    distinctUntilChanged(),
  );

  readonly filteredPokemons$ = combineLatest([
    this.pokemons$,
    this.searchTerm$,
    this.typeFilter$,
  ]).pipe(
    map(([pokemons, term, type]) => {
      const search = term.trim().toLowerCase();
      const selectedType = type.trim().toLowerCase();

      return pokemons.filter((pokemon) => {
        const matchesSearch = !search || pokemon.name.toLowerCase().includes(search);

        const matchesType =
          !selectedType ||
          pokemon.types.some((pokemonType) => pokemonType.toLowerCase() === selectedType);

        return matchesSearch && matchesType;
      });
    }),
  );
}
