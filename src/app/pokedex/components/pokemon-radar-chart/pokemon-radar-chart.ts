import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  Chart,
  ChartData,
  ChartOptions,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadarController,
  RadialLinearScale,
  Tooltip,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonRadarChart implements OnChanges {
  readonly pokemon = input<Pokemon | null>(null);

  radarChartData: ChartData<'radar'> = {
    labels: [],
    datasets: [],
  };

  readonly radarChartOptions: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },

    animation: {
      duration: 800,
      easing: 'easeOutQuart',
    },

    scales: {
      r: {
        beginAtZero: true,
        suggestedMax: 150,

        grid: {
          color: '#e5e7eb',
        },

        angleLines: {
          color: '#e5e7eb',
        },

        pointLabels: {
          color: '#475569',
          font: {
            size: 12,
            weight: 600,
          },
        },

        ticks: {
          display: false,
        },
      },
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['pokemon']) {
      return;
    }

    const pokemon = this.pokemon();

    if (!pokemon) {
      this.radarChartData = {
        labels: [],
        datasets: [],
      };
      return;
    }

    this.radarChartData = {
      labels: pokemon.stats.map((stat) => stat.name.toUpperCase()),
      datasets: [
        {
          label: `${pokemon.name} Base Stats`,
          data: pokemon.stats.map((stat) => stat.value),
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37,99,235,0.20)',
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: '#2563eb',
        },
      ],
    };
  }
}
