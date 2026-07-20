import { AfterViewInit, Component, ViewChild, inject, input, output, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { Pokemon } from '../../../shared/models/pokemon.model';
import { PokemonStore } from '../../state/pokemon.store';
import { PokemonSelectors } from '../../state/pokemon.selectors';

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
export class PokemonTable implements AfterViewInit {
  readonly pokemons = input.required<Pokemon[]>();

  readonly displayedColumns = ['sprite', 'name', 'types', 'actions'];

  readonly dataSource = new MatTableDataSource<Pokemon>();

  private readonly store = inject(PokemonStore);
  private readonly selectors = inject(PokemonSelectors);

  readonly team = toSignal(this.selectors.team$, {
    initialValue: [] as Pokemon[],
  });

  readonly pokemonSelected = output<Pokemon>();

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor() {
    effect(() => {
      this.dataSource.data = this.pokemons();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onSearch(value: string): void {
    this.store.setSearchTerm(value);
  }

  onRowClick(pokemon: Pokemon): void {
    this.store.selectPokemon(pokemon);
    this.pokemonSelected.emit(pokemon);
  }

  addToTeam(pokemon: Pokemon): void {
    this.store.addToTeam(pokemon);
  }

  isInTeam(id: number): boolean {
    return this.team().some((pokemon) => pokemon.id === id);
  }

  get isTeamFull(): boolean {
    return this.team().length >= 6;
  }
}
