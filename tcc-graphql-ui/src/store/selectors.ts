import { RootState } from "./store";

export const selectPokemonList = (state: RootState) => state.list.results;
export const selectSelectedPokemon = (state: RootState) =>
	state.details.selected;
