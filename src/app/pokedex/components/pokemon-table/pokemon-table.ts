import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Pokemon } from '../../../shared/models/pokemon.model';

@Component({
  selector: 'app-pokemon-table',
  standalone: true,
  templateUrl: './pokemon-table.html',
  styleUrl: './pokemon-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonTable {
  readonly pokemons = input.required<Pokemon[]>();
}
