import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { firstValueFrom } from 'rxjs';

import { PokemonStore } from './pokemon.store';
import { PokemonApi } from '../services/pokemon';
import { Pokemon } from '../../shared/models/pokemon.model';

describe('PokemonStore', () => {
  let store: PokemonStore;
  let api: { getPokemons: ReturnType<typeof vi.fn> };

  const bulbasaur: Pokemon = {
    id: 1,
    name: 'bulbasaur',
    height: 7,
    weight: 69,
    sprite: 'bulbasaur.png',
    types: ['grass', 'poison'],
    abilities: ['overgrow'],
    stats: [
      { name: 'hp', value: 45 },
      { name: 'attack', value: 49 },
    ],
  };

  const ivysaur: Pokemon = {
    id: 2,
    name: 'ivysaur',
    height: 10,
    weight: 130,
    sprite: 'ivysaur.png',
    types: ['grass', 'poison'],
    abilities: ['overgrow'],
    stats: [
      { name: 'hp', value: 60 },
      { name: 'attack', value: 62 },
    ],
  };

  beforeEach(() => {
    api = {
      getPokemons: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        PokemonStore,
        {
          provide: PokemonApi,
          useValue: api,
        },
      ],
    });

    store = TestBed.inject(PokemonStore);
  });

  afterEach(() => {
    store.reset();
    vi.clearAllMocks();
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should load pokemons', async () => {
    api.getPokemons.mockReturnValue(of([bulbasaur, ivysaur]));

    store.loadPokemons();

    const state = await firstValueFrom(store.state$);

    expect(state.pokemons.length).toBe(2);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle api errors', async () => {
    api.getPokemons.mockReturnValue(throwError(() => new Error('Network Error')));

    store.loadPokemons();

    const state = await firstValueFrom(store.state$);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Failed to load Pokémon.');
  });

  it('should select pokemon', async () => {
    store.selectPokemon(bulbasaur);

    const state = await firstValueFrom(store.state$);

    expect(state.selectedPokemon).toEqual(bulbasaur);
  });

  it('should update search term', async () => {
    store.setSearchTerm('bulba');

    const state = await firstValueFrom(store.state$);

    expect(state.searchTerm).toBe('bulba');
  });

  it('should add pokemon to team', async () => {
    store.addToTeam(bulbasaur);

    const state = await firstValueFrom(store.state$);

    expect(state.team.length).toBe(1);
    expect(state.team[0]).toEqual(bulbasaur);
  });

  it('should prevent duplicate pokemon', async () => {
    store.addToTeam(bulbasaur);
    store.addToTeam(bulbasaur);

    const state = await firstValueFrom(store.state$);

    expect(state.team.length).toBe(1);
  });

  it('should remove pokemon from team', async () => {
    store.addToTeam(bulbasaur);

    store.removeFromTeam(bulbasaur.id);

    const state = await firstValueFrom(store.state$);

    expect(state.team.length).toBe(0);
  });

  it('should clear the team', async () => {
    store.addToTeam(bulbasaur);
    store.addToTeam(ivysaur);

    store.clearTeam();

    const state = await firstValueFrom(store.state$);

    expect(state.team.length).toBe(0);
  });

  it('should not allow more than six pokemon', async () => {
    for (let i = 1; i <= 7; i++) {
      store.addToTeam({
        ...bulbasaur,
        id: i,
        name: `pokemon-${i}`,
      });
    }

    const state = await firstValueFrom(store.state$);

    expect(state.team.length).toBe(6);
  });

  it('should reset the state', async () => {
    store.selectPokemon(bulbasaur);
    store.setSearchTerm('bulba');
    store.addToTeam(bulbasaur);

    store.reset();

    const state = await firstValueFrom(store.state$);

    expect(state.selectedPokemon).toBeNull();
    expect(state.searchTerm).toBe('');
    expect(state.team.length).toBe(0);
    expect(state.pokemons.length).toBe(0);
  });
});
