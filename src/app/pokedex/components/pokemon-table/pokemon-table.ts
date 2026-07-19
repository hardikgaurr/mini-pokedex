import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { Pokemon } from '../../../shared/models/pokemon.model';
import { PokemonStore } from '../../state/pokemon.store';

@Component({
  selector: 'app-pokemon-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatInputModule, FormsModule],
  templateUrl: './pokemon-table.html',
  styleUrl: './pokemon-table.scss',
})
export class PokemonTable {
  readonly pokemons = input.required<Pokemon[]>();

  readonly displayedColumns = ['sprite', 'name', 'types'];

  private readonly store = inject(PokemonStore);

  onSearch(value: string): void {
    this.store.setSearchTerm(value);
  }
}
