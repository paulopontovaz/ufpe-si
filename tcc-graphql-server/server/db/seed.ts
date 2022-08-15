import * as fs from "fs";
import mongoose from "mongoose";
import dbConfig from "./database";
import { IPokemon } from "../types/pokemon.type";
import { PokemonModel } from "../model/pokemon.model";

const rawdata = fs.readFileSync("./server/db/db.json");
const pokemonSeedData = JSON.parse(rawdata.toString());

const handleError = (error: any) => {
	if (error) {
		console.log("handleError error: ", error);
	}
};

mongoose
	.connect(dbConfig.db)
	.then((_) => {
		mongoose.connection.db.dropDatabase();
		console.log("Database connected successfully");
		(pokemonSeedData as IPokemon[]).forEach((pokemon) => {
			try {
				PokemonModel.create(pokemon, handleError);
				console.log("Inserted Pokémon: ", pokemon.name);
			} catch (err) {
				console.log("Fell in catch: ", err);
			}
		});

		process.exit();
	})
	.catch((error) => {
		console.error("Failed to connect to the database", error);
	});
