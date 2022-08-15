import { PokemonTC } from "../model/pokemon.model";
import { SchemaComposer } from "graphql-compose";

const schemaComposer = new SchemaComposer();
schemaComposer.Query.addFields({
	pokemonOne: PokemonTC.mongooseResolvers.findOne(),
	pokemonMany: PokemonTC.mongooseResolvers
		.findMany({
			limit: {
				defaultValue: -1,
			},
			sort: {
				sortTypeName: "_ID_ASC",
			},
		})
		.addFilterArg({
			name: "nameRegex",
			type: "String",
			description: "Search by name in regExp",
			query: (query, value) => {
				query.name = new RegExp(value, "i");
			},
		}),
});

export default schemaComposer.buildSchema();
