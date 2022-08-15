import mongoose from "mongoose";
import { composeMongoose } from "graphql-compose-mongoose";
import {
	IPokemonStats,
	IPokemonMove,
	IPokemonMoves,
	IPokemonAbilities,
	IPokemonDamages,
	IPokemonMisc,
	IPokemon,
	PokemonType,
} from "../types/pokemon.type";

const PokemonStatsSchema = new mongoose.Schema<IPokemonStats>(
	{
		hp: Number,
		attack: String,
		defense: String,
		spattack: String,
		spdefense: String,
		speed: Number,
	},
	{ _id: false }
);

const PokemonMoveSchema = new mongoose.Schema<IPokemonMove>(
	{
		learnedat: String,
		name: String,
	},
	{ _id: false }
);

const PokemonMovesSchema = new mongoose.Schema<IPokemonMoves>(
	{
		level: [PokemonMoveSchema],
	},
	{ _id: false }
);

const PokemonAbilitiesSchema = new mongoose.Schema<IPokemonAbilities>(
	{
		normal: [{ type: String }],
		hidden: [{ type: String }],
	},
	{ _id: false }
);

const PokemonDamagesSchema = new mongoose.Schema<IPokemonDamages>(
	{
		normal: String,
		fire: String,
		water: String,
		electric: String,
		grass: String,
		ice: String,
		fight: String,
		poison: String,
		ground: String,
		flying: String,
		psychic: String,
		bug: String,
		rock: String,
		ghost: String,
		dragon: String,
		dark: String,
		steel: String,
	},
	{ _id: false }
);

const PokemonMiscSchema = new mongoose.Schema<IPokemonMisc>(
	{
		abilities: PokemonAbilitiesSchema,
		classification: String,
		height: String,
		weight: String,
	},
	{ _id: false }
);

const PokemonSchema = new mongoose.Schema<IPokemon>(
	{
		id: Number,
		name: String,
		img: String,
		nickname: String,
		moves: PokemonMovesSchema,
		damages: PokemonDamagesSchema,
		stats: PokemonStatsSchema,
		misc: PokemonMiscSchema,
		type: [
			{
				type: String,
				enum: Object.values(PokemonType),
			},
		],
	},
	{
		collection: "pokemon",
		autoIndex: true,
		minimize: true,
	}
);

export const PokemonModel = mongoose.model<IPokemon>("Pokemon", PokemonSchema);
export const PokemonTC = composeMongoose(PokemonModel);
