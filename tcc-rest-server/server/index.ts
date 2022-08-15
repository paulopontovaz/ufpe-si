import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import cors from "cors";
import dbConfig from "./db/database";
import pokemonRoute from "./routes/pokemon.route";

mongoose.Promise = global.Promise;
mongoose
	.connect(dbConfig.db)
	.then((_) => {
		console.log("Database connected successfully");
	})
	.catch((error) => {
		console.error("Failed to connect to the database", error);
	});

const app = express();
const port = process.env.PORT || 3001;

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.options("*", cors);
app.use("/pokemon-api", pokemonRoute);

app.listen(port, () => {
	console.log("Server connected successfully to port: ", port);
});
