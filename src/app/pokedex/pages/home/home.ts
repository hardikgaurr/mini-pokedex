import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';

import { PokemonDrawer } from '../../components/pokemon-drawer/pokemon-drawer';
import { PokemonTable } from '../../components/pokemon-table/pokemon-table';
import { TeamBuilder } from '../../components/team-builder/team-builder';

import { PokemonSelectors } from '../../state/pokemon.selectors';
import { PokemonStore } from '../../state/pokemon.store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    PokemonTable,
    PokemonDrawer,
    TeamBuilder,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit {
  private readonly store = inject(PokemonStore);
  private readonly selectors = inject(PokemonSelectors);

  readonly pokemons = toSignal(this.selectors.filteredPokemons$, {
    initialValue: [],
  });

  readonly selectedPokemon = toSignal(this.selectors.selectedPokemon$, {
    initialValue: null,
  });

  readonly loading = toSignal(this.selectors.loading$, {
    initialValue: false,
  });

  readonly error = toSignal(this.selectors.error$, {
    initialValue: null,
  });

  ngOnInit(): void {
    this.store.loadPokemons();
  }

  retry(): void {
    this.store.loadPokemons();
  }

  closeDrawer(): void {
    this.store.selectPokemon(null as any);
  }
}
