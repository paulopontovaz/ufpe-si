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

export interface PokemonStats {
	readonly hp: number;
	readonly attack: string;
	readonly defense: string;
	readonly spattack: string;
	readonly spdefense: string;
	readonly speed: number;
}

export interface PokemonMove {
	readonly learnedat: string;
	readonly name: string;
}

export interface PokemonMoves {
	readonly level: PokemonMove[];
}

export interface PokemonDamages {
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

export interface PokemonAbilities {
	readonly normal: string[];
	readonly hidden: string[];
}

export interface PokemonMisc {
	readonly abilities: PokemonAbilities;
	readonly classification: string;
	readonly height: string;
	readonly weight: string;
}

export interface Pokemon {
	readonly id: number;
	readonly name: string;
	readonly img: string;
	nickname: string;
	readonly moves: PokemonMoves;
	readonly damages: PokemonDamages;
	readonly stats: PokemonStats;
	readonly misc: PokemonMisc;
	readonly type: PokemonType[];
}
