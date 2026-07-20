import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { PokemonStore } from '../../state/pokemon.store';
import { PokemonSelectors } from '../../state/pokemon.selectors';
import { Pokemon } from '../../../shared/models/pokemon.model';

@Component({
  selector: 'app-team-builder',
  standalone: true,
  imports: [CommonModule, MatChipsModule, MatIconModule, MatButtonModule],
  templateUrl: './team-builder.html',
  styleUrl: './team-builder.scss',
})
export class TeamBuilder {
  private readonly store = inject(PokemonStore);
  private readonly selectors = inject(PokemonSelectors);

  readonly team = toSignal(this.selectors.team$, {
    initialValue: [] as Pokemon[],
  });

  remove(id: number): void {
    this.store.removeFromTeam(id);
  }

  clear(): void {
    this.store.clearTeam();
  }
}
