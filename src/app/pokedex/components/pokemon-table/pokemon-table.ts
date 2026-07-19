import { AfterViewInit, Component, ViewChild, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';

import { Pokemon } from '../../../shared/models/pokemon.model';
import { PokemonStore } from '../../state/pokemon.store';

@Component({
  selector: 'app-pokemon-table',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatSortModule, MatInputModule],
  templateUrl: './pokemon-table.html',
  styleUrl: './pokemon-table.scss',
})
export class PokemonTable implements AfterViewInit {
  readonly pokemons = input.required<Pokemon[]>();

  @ViewChild(MatSort)
  sort!: MatSort;

  readonly displayedColumns = ['sprite', 'name', 'types'];

  readonly dataSource = new MatTableDataSource<Pokemon>();

  private readonly store = inject(PokemonStore);

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngDoCheck(): void {
    this.dataSource.data = this.pokemons();
  }

  onSearch(value: string): void {
    this.store.setSearchTerm(value);
  }
}
