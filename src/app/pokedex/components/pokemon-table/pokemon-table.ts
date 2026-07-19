import { AfterViewInit, Component, DoCheck, ViewChild, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { Pokemon } from '../../../shared/models/pokemon.model';
import { PokemonStore } from '../../state/pokemon.store';

@Component({
  selector: 'app-pokemon-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
  ],
  templateUrl: './pokemon-table.html',
  styleUrl: './pokemon-table.scss',
})
export class PokemonTable implements AfterViewInit, DoCheck {
  readonly pokemons = input.required<Pokemon[]>();

  readonly displayedColumns = ['sprite', 'name', 'types'];

  readonly dataSource = new MatTableDataSource<Pokemon>();

  private readonly store = inject(PokemonStore);

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngDoCheck(): void {
    this.dataSource.data = this.pokemons();
  }

  onSearch(value: string): void {
    this.store.setSearchTerm(value);
  }
}
