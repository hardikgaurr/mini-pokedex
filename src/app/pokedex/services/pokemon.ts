import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, filter, map } from 'rxjs';

import { GET_POKEMONS } from '../../shared/graphql/pokemon.queries';
import { Pokemon } from '../../shared/models/pokemon.model';
import { mapPokemonList } from './pokemon.mapper';

@Injectable({
  providedIn: 'root',
})
export class PokemonApi {
  private readonly apollo = inject(Apollo);

  getPokemons(limit = 10, offset = 0): Observable<Pokemon[]> {
    return this.apollo
      .watchQuery({
        query: GET_POKEMONS,
        variables: {
          limit,
          offset,
        },
      })
      .valueChanges.pipe(
        filter((result) => !!result.data),
        map(mapPokemonList),
      );
  }
}
