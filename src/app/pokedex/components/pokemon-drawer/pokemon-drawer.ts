import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Pokemon } from '../../../shared/models/pokemon.model';
import { PokemonRadarChart } from '../pokemon-radar-chart/pokemon-radar-chart';

@Component({
  selector: 'app-pokemon-drawer',
  standalone: true,
  imports: [CommonModule, PokemonRadarChart],
  templateUrl: './pokemon-drawer.html',
  styleUrl: './pokemon-drawer.scss',
})
export class PokemonDrawer {
  readonly pokemon = input<Pokemon | null>(null);
}
