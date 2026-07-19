import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';

import { Pokemon } from '../../../shared/models/pokemon.model';
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
  private readonly cdr = inject(ChangeDetectorRef);

  pokemons: Pokemon[] = [];

  ngOnInit(): void {
    this.store.loadPokemons();

    this.selectors.pokemons$.subscribe((pokemons) => {
      this.pokemons = pokemons;
      this.cdr.markForCheck();
    });
  }
}
