import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, EMPTY, catchError, tap } from 'rxjs';

import { PokemonApi } from '../services/pokemon';
import { Pokemon } from '../../shared/models/pokemon.model';
import { PokemonState, initialPokemonState } from './pokemon.state';

const MAX_TEAM_SIZE = 6;

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
    this.setState({
      loading: true,
      error: null,
    });

    this.pokemonApi
      .getPokemons()
      .pipe(
        tap((pokemons: Pokemon[]) => {
          this.setState({
            pokemons,
            loading: false,
          });
        }),
        catchError((error) => {
          console.error('Failed to load Pokémon:', error);

          this.setState({
            loading: false,
            error: 'Failed to load Pokémon.',
          });

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

  setTypeFilter(typeFilter: string): void {
    this.setState({
      typeFilter,
    });
  }

  addToTeam(pokemon: Pokemon): void {
    if (this.isInTeam(pokemon.id)) {
      return;
    }

    if (this.state.team.length >= MAX_TEAM_SIZE) {
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
    if (this.state.team.length === 0) {
      return;
    }

    this.setState({
      team: [],
    });
  }

  isInTeam(id: number): boolean {
    return this.state.team.some((pokemon) => pokemon.id === id);
  }

  reset(): void {
    this.stateSubject.next(initialPokemonState);
  }
}
