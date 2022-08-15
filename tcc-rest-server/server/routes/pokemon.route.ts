import * as express from "express";
import PokemonModel from "../model/pokemon.model";

const pokemonExpressRoute = express.Router();

const handleError = (res: any, next: any) => (error: any, data: any) => {
	if (error) {
		console.log("handleError: ", error);
		return next(error);
	}

	res.json(data);
};

pokemonExpressRoute.route("/pokemon").get((req: any, res: any, next: any) => {
	console.log("Fetch pokemon list req.query", req.query);
	const query = req.query?.q?.toString();
	const searchParams = query
		? { name: { $regex: query, $options: "i" } }
		: {};
	console.log("Fetch pokemon list searchParams", searchParams);

	PokemonModel.find(searchParams)
		.sort({ id: "asc" })
		.exec(handleError(res, next));
});

pokemonExpressRoute
	.route("/pokemon/:id")
	.get((req: any, res: any, next: any) => {
		console.log("Fetch pokemon req.params:", req.params);
		PokemonModel.findOne({ id: req.params.id }, handleError(res, next));
	});

export default pokemonExpressRoute;
