import { inject } from '@angular/core';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { InMemoryCache } from '@apollo/client/core';

import { environment } from '../../../environments/environment';

export const providePokemonApollo = () =>
  provideApollo(() => {
    const httpLink = inject(HttpLink);

    return {
      cache: new InMemoryCache(),
      link: httpLink.create({
        uri: environment.pokemonApi,
      }),
    };
  });
