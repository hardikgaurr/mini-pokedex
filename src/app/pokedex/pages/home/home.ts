import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { MatSidenavModule } from '@angular/material/sidenav';

import { PokemonTable } from '../../components/pokemon-table/pokemon-table';
import { PokemonDrawer } from '../../components/pokemon-drawer/pokemon-drawer';

import { PokemonStore } from '../../state/pokemon.store';
import { PokemonSelectors } from '../../state/pokemon.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatSidenavModule, PokemonTable, PokemonDrawer],
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

  ngOnInit(): void {
    this.store.loadPokemons();
  }
}
