import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/pokemon.schema";
import dbConfig from "./db/database";

const PORT = 3001;
const API_ENDPOINT = "/pokemon-api";
const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(
	API_ENDPOINT,
	graphqlHTTP({
		schema,
		graphiql: true,
	})
);

app.listen(PORT);

console.log(
	`Running a GraphQL API server at http://localhost:${PORT}${API_ENDPOINT}`
);

mongoose
	.connect(dbConfig.db)
	.then((_) => {
		console.log("Database connected successfully");
	})
	.catch((error) => {
		console.error("Failed to connect to the database", error);
	});
