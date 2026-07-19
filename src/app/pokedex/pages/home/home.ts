import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';

import { PokemonApi } from '../../services/pokemon';
import { Pokemon } from '../../../shared/models/pokemon.model';

import { PokemonTable } from '../../components/pokemon-table/pokemon-table';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PokemonTable],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit {
  private readonly pokemonApi = inject(PokemonApi);
  private readonly cdr = inject(ChangeDetectorRef);

  pokemons: Pokemon[] = [];

  ngOnInit(): void {
    this.pokemonApi.getPokemons().subscribe({
      next: (pokemons) => {
        this.pokemons = pokemons;
        this.cdr.markForCheck();
      },

      error: (error) => {
        console.error(error);
      },
    });
  }
}
