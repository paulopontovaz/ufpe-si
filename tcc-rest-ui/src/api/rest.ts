import axios from "axios";
import { Pokemon } from "../types/pokemon";

const instance = axios.create({
	baseURL: "http://localhost:3001/pokemon-api",
});

export const fetchPokemonListService = (query: string = "") =>
	instance.get(`/pokemon?q=${query}`);

export const fetchPokemonService = (pokemonId: Pokemon["id"]) =>
	instance.get(`/pokemon/${pokemonId}`);
