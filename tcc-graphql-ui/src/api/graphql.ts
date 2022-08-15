import { request, gql } from "graphql-request";
import { Pokemon } from "../types/pokemon";

const API_URL = "http://localhost:3001/pokemon-api";

const pokemonFindManyQuery = (query: string = "") => gql`
	{
		pokemonMany(filter: {nameRegex: "${query}"}, sort: _ID_ASC) {
			id,
			name,
			type,
			img
		}
	}
`;

export const fetchPokemonListService = (query: string = "") =>
	request(API_URL, pokemonFindManyQuery(query)).then((res) => ({
		data: res?.pokemonMany,
	}));

const pokemonFindOneQuery = (pokemonId: Pokemon["id"]) => gql`
	{
		pokemonOne(filter: {id: ${pokemonId}}) {
			id,
			name,
			img,
			nickname,
			moves { 
				level { 
					learnedat, 
					name 
				} 
			},
			damages {
				normal,
				fire,
				water,
				electric,
				grass,
				ice,
				fight,
				poison,
				ground,
				flying,
				psychic,
				bug,
				rock,
				ghost,
				dragon,
				dark,
				steel,
			},
			stats {
				hp,
				attack,
				defense,
				spattack,
				spdefense,
				speed,
			},
			misc {
				abilities {
					normal,
					hidden
				},
				classification,
				height,
				weight,
			},
			type
		}
	}
`;

export const fetchPokemonService = (pokemonId: Pokemon["id"]) =>
	request(API_URL, pokemonFindOneQuery(pokemonId)).then((res) => ({
		data: res?.pokemonOne,
	}));
