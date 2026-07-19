import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { Pokemon } from '../../../shared/models/pokemon.model';

@Component({
  selector: 'app-pokemon-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './pokemon-table.html',
  styleUrl: './pokemon-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonTable {
  readonly pokemons = input.required<Pokemon[]>();

  readonly displayedColumns = ['sprite', 'name', 'types'];
}
