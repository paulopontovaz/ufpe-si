import * as mongoose from "mongoose";
import {
	PokemonStats,
	PokemonMove,
	PokemonMoves,
	PokemonAbilities,
	PokemonDamages,
	PokemonMisc,
	Pokemon,
	PokemonType,
} from "../types/pokemon.type";

const Schema = mongoose.Schema;

const PokemonStatsSchema = new Schema<PokemonStats>(
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

const PokemonMoveSchema = new Schema<PokemonMove>(
	{
		learnedat: String,
		name: String,
	},
	{ _id: false }
);

const PokemonMovesSchema = new Schema<PokemonMoves>(
	{
		level: [PokemonMoveSchema],
	},
	{ _id: false }
);

const PokemonAbilitiesSchema = new Schema<PokemonAbilities>(
	{
		normal: [{ type: String }],
		hidden: [{ type: String }],
	},
	{ _id: false }
);

const PokemonDamagesSchema = new Schema<PokemonDamages>(
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

const PokemonMiscSchema = new Schema<PokemonMisc>(
	{
		abilities: PokemonAbilitiesSchema,
		classification: String,
		height: String,
		weight: String,
	},
	{ _id: false }
);

const PokemonSchema = new Schema<Pokemon>(
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

export default mongoose.model("PokemonSchema", PokemonSchema);
