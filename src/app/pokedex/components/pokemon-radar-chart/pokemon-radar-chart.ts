import { Component, OnChanges, SimpleChanges, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  Chart,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

import { BaseChartDirective } from 'ng2-charts';

import { Pokemon } from '../../../shared/models/pokemon.model';

Chart.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

@Component({
  selector: 'app-pokemon-radar-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './pokemon-radar-chart.html',
  styleUrl: './pokemon-radar-chart.scss',
})
export class PokemonRadarChart implements OnChanges {
  readonly pokemon = input<Pokemon | null>(null);

  radarChartData = {
    labels: [] as string[],
    datasets: [
      {
        label: 'Base Stats',
        data: [] as number[],
      },
    ],
  };

  radarChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['pokemon']) return;

    const pokemon = this.pokemon();

    if (!pokemon) return;

    this.radarChartData = {
      labels: pokemon.stats.map((s) => s.name),
      datasets: [
        {
          label: pokemon.name,
          data: pokemon.stats.map((s) => s.value),
        },
      ],
    };
  }
}
