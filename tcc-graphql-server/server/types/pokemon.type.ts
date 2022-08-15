import mongoose from "mongoose";

export enum PokemonType {
	NORMAL = "Normal",
	FIRE = "Fire",
	WATER = "Water",
	ELECTRIC = "Electric",
	GRASS = "Grass",
	ICE = "Ice",
	FIGHTING = "Fighting",
	POISON = "Poison",
	GROUND = "Ground",
	FLYING = "Flying",
	PSYCHIC = "Psychic",
	BUG = "Bug",
	ROCK = "Rock",
	GHOST = "Ghost",
	DRAGON = "Dragon",
	DARK = "Dark",
	STEEL = "Steel",
	FAIRY = "Fairy",
}

export interface IPokemonStats extends mongoose.Document {
	readonly hp: number;
	readonly attack: string;
	readonly defense: string;
	readonly spattack: string;
	readonly spdefense: string;
	readonly speed: number;
}

export interface IPokemonMove extends mongoose.Document {
	readonly learnedat: string;
	readonly name: string;
}

export interface IPokemonMoves extends mongoose.Document {
	readonly level: IPokemonMove[];
}

export interface IPokemonDamages extends mongoose.Document {
	readonly normal: string;
	readonly fire: string;
	readonly water: string;
	readonly electric: string;
	readonly grass: string;
	readonly ice: string;
	readonly fight: string;
	readonly poison: string;
	readonly ground: string;
	readonly flying: string;
	readonly psychic: string;
	readonly bug: string;
	readonly rock: string;
	readonly ghost: string;
	readonly dragon: string;
	readonly dark: string;
	readonly steel: string;
}

export interface IPokemonAbilities extends mongoose.Document {
	readonly normal: string[];
	readonly hidden: string[];
}

export interface IPokemonMisc extends mongoose.Document {
	readonly abilities: IPokemonAbilities;
	readonly classification: string;
	readonly height: string;
	readonly weight: string;
}

export interface IPokemon extends mongoose.Document {
	readonly id: number;
	readonly name: string;
	readonly img: string;
	nickname: string;
	readonly moves: IPokemonMoves;
	readonly damages: IPokemonDamages;
	readonly stats: IPokemonStats;
	readonly misc: IPokemonMisc;
	readonly type: PokemonType[];
}
