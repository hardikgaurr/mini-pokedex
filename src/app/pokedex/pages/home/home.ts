import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { PokemonTable } from '../../components/pokemon-table/pokemon-table';
import { PokemonStore } from '../../state/pokemon.store';
import { PokemonSelectors } from '../../state/pokemon.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PokemonTable],
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

  ngOnInit(): void {
    this.store.loadPokemons();
  }
}
