import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPokemonListService } from "../api/rest";
import { Pokemon } from "../types/pokemon";

export const fetchPokemonList = createAsyncThunk(
	"list/fetchPokemonList",
	async (query?: string) => {
		console.log("fetchPokemonList query ", query);
		const response = await fetchPokemonListService(query);
		return (await response.data) as Pokemon[];
	}
);

interface ListState {
	results: Pokemon[];
}

const initialState: ListState = {
	results: [],
};

export const listSlice = createSlice({
	name: "list",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchPokemonList.fulfilled, (state, action) => {
			state.results = action.payload;
		});
	},
});

export default listSlice.reducer;
