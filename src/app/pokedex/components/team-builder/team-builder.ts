import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { Pokemon } from '../../../shared/models/pokemon.model';
import { PokemonSelectors } from '../../state/pokemon.selectors';
import { PokemonStore } from '../../state/pokemon.store';

@Component({
  selector: 'app-team-builder',
  standalone: true,
  imports: [
    CommonModule,
    TitleCasePipe,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
  ],
  templateUrl: './team-builder.html',
  styleUrl: './team-builder.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamBuilder {
  private readonly store = inject(PokemonStore);
  private readonly selectors = inject(PokemonSelectors);

  readonly team = toSignal(this.selectors.team$, {
    initialValue: [] as Pokemon[],
  });

  readonly teamSize = () => this.team().length;

  readonly isEmpty = () => this.teamSize() === 0;

  readonly isFull = () => this.teamSize() >= 6;

  remove(id: number): void {
    this.store.removeFromTeam(id);
  }

  clear(): void {
    if (this.isEmpty()) {
      return;
    }

    this.store.clearTeam();
  }
}
