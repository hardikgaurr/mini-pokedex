import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Pokemon } from '../../../shared/models/pokemon.model';
import { PokemonSelectors } from '../../state/pokemon.selectors';
import { PokemonStore } from '../../state/pokemon.store';

@Component({
  selector: 'app-pokemon-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TitleCasePipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule,
  ],
  templateUrl: './pokemon-table.html',
  styleUrl: './pokemon-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonTable implements AfterViewInit {
  readonly pokemons = input.required<Pokemon[]>();

  readonly pokemonSelected = output<Pokemon>();

  readonly displayedColumns = ['sprite', 'name', 'types', 'actions'];

  readonly dataSource = new MatTableDataSource<Pokemon>();

  readonly pokemonTypes = [
    'bug',
    'dark',
    'dragon',
    'electric',
    'fairy',
    'fighting',
    'fire',
    'flying',
    'ghost',
    'grass',
    'ground',
    'ice',
    'normal',
    'poison',
    'psychic',
    'rock',
    'steel',
    'water',
  ];

  private readonly store = inject(PokemonStore);
  private readonly selectors = inject(PokemonSelectors);

  readonly team = toSignal(this.selectors.team$, {
    initialValue: [] as Pokemon[],
  });

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor() {
    effect(() => {
      this.dataSource.data = this.pokemons();
      this.paginator?.firstPage();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onSearch(value: string): void {
    this.store.setSearchTerm(value);
    this.paginator?.firstPage();
  }

  onTypeFilter(type: string): void {
    this.store.setTypeFilter(type);
    this.paginator?.firstPage();
  }

  onRowClick(pokemon: Pokemon): void {
    this.store.selectPokemon(pokemon);
    this.pokemonSelected.emit(pokemon);
  }

  addToTeam(pokemon: Pokemon): void {
    if (this.isInTeam(pokemon.id) || this.isTeamFull()) {
      return;
    }

    this.store.addToTeam(pokemon);
  }

  isInTeam(id: number): boolean {
    return this.team().some((pokemon) => pokemon.id === id);
  }

  isTeamFull(): boolean {
    return this.team().length >= 6;
  }

  getTypeClass(type: string): string {
    return `type-${type.toLowerCase()}`;
  }

  trackType(_: number, type: string): string {
    return type;
  }

  buttonLabel(pokemon: Pokemon): string {
    if (this.isInTeam(pokemon.id)) {
      return 'Added';
    }

    if (this.isTeamFull()) {
      return 'Team Full';
    }

    return 'Add';
  }

  buttonIcon(pokemon: Pokemon): string {
    if (this.isInTeam(pokemon.id)) {
      return 'check';
    }

    if (this.isTeamFull()) {
      return 'block';
    }

    return 'add';
  }

  buttonTooltip(pokemon: Pokemon): string {
    if (this.isInTeam(pokemon.id)) {
      return 'Already in your team';
    }

    if (this.isTeamFull()) {
      return 'Maximum of 6 Pokémon allowed';
    }

    return 'Add to team';
  }
}
