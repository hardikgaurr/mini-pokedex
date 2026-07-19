import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PokemonState, initialPokemonState } from './pokemon.state';

@Injectable({
  providedIn: 'root',
})
export class PokemonStore {
  private readonly state = new BehaviorSubject<PokemonState>(initialPokemonState);

  readonly state$ = this.state.asObservable();

  get snapshot(): PokemonState {
    return this.state.value;
  }

  update(partial: Partial<PokemonState>): void {
    this.state.next({
      ...this.snapshot,
      ...partial,
    });
  }

  reset(): void {
    this.state.next(initialPokemonState);
  }
}
