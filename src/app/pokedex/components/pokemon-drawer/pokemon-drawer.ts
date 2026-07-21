import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Pokemon } from '../../../shared/models/pokemon.model';
import { PokemonRadarChart } from '../pokemon-radar-chart/pokemon-radar-chart';

@Component({
  selector: 'app-pokemon-drawer',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    PokemonRadarChart,
  ],
  templateUrl: './pokemon-drawer.html',
  styleUrl: './pokemon-drawer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDrawer {
  readonly pokemon = input<Pokemon | null>(null);
  readonly close = output<void>();
}
