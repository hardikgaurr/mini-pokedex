import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, tap } from 'rxjs';

import { PokemonApi } from '../services/pokemon';
import { Pokemon } from '../../shared/models/pokemon.model';
import { PokemonState, initialPokemonState } from './pokemon.state';

@Injectable({
  providedIn: 'root',
})
export class PokemonStore {
  private readonly pokemonApi = inject(PokemonApi);

  private readonly stateSubject = new BehaviorSubject<PokemonState>(initialPokemonState);

  readonly state$ = this.stateSubject.asObservable();

  private get state(): PokemonState {
    return this.stateSubject.value;
  }

  private setState(partial: Partial<PokemonState>): void {
    this.stateSubject.next({
      ...this.state,
      ...partial,
    });
  }

  loadPokemons(): void {
    this.setLoading(true);
    this.setError(null);

    this.pokemonApi
      .getPokemons()
      .pipe(
        tap((pokemons: Pokemon[]) => {
          this.setState({
            pokemons,
            loading: false,
          });
        }),
        catchError(() => {
          this.setError('Failed to load Pokémon.');
          this.setLoading(false);
          return EMPTY;
        }),
      )
      .subscribe();
  }

  selectPokemon(pokemon: Pokemon): void {
    this.setState({
      selectedPokemon: pokemon,
    });
  }

  clearSelection(): void {
    this.setState({
      selectedPokemon: null,
    });
  }

  setSearchTerm(searchTerm: string): void {
    this.setState({
      searchTerm,
    });
  }

  // ===========================
  // Team Builder
  // ===========================

  addToTeam(pokemon: Pokemon): void {
    if (this.state.team.some((p) => p.id === pokemon.id)) {
      return;
    }

    if (this.state.team.length >= 6) {
      return;
    }

    this.setState({
      team: [...this.state.team, pokemon],
    });
  }

  removeFromTeam(id: number): void {
    this.setState({
      team: this.state.team.filter((pokemon) => pokemon.id !== id),
    });
  }

  clearTeam(): void {
    this.setState({
      team: [],
    });
  }

  isInTeam(id: number): boolean {
    return this.state.team.some((pokemon) => pokemon.id === id);
  }

  // ===========================

  private setLoading(loading: boolean): void {
    this.setState({
      loading,
    });
  }

  private setError(error: string | null): void {
    this.setState({
      error,
    });
  }

  reset(): void {
    this.stateSubject.next(initialPokemonState);
  }
}
