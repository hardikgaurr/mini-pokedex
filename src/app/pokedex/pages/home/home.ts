import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PokemonTable } from '../../components/pokemon-table/pokemon-table';
import { PokemonDrawer } from '../../components/pokemon-drawer/pokemon-drawer';

import { PokemonStore } from '../../state/pokemon.store';
import { PokemonSelectors } from '../../state/pokemon.selectors';
import { TeamBuilder } from '../../components/team-builder/team-builder';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatSidenavModule, MatProgressSpinnerModule, PokemonTable, PokemonDrawer, TeamBuilder],
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
}
