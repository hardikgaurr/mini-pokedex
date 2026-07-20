import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, filter, map, retry, shareReplay, timer } from 'rxjs';

import { GET_POKEMONS } from '../../shared/graphql/pokemon.queries';
import { Pokemon } from '../../shared/models/pokemon.model';
import { mapPokemonList } from './pokemon.mapper';

@Injectable({
  providedIn: 'root',
})
export class PokemonApi {
  private readonly apollo = inject(Apollo);

  /**
   * Fetches a paginated list of Pokémon from the GraphQL API.
   * Retries transient failures before propagating the error.
   */
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
        retry({
          count: 2,
          delay: () => timer(1000),
        }),
        filter((result) => !!result.data),
        map(mapPokemonList),
        shareReplay({
          bufferSize: 1,
          refCount: true,
        }),
      );
  }
}
