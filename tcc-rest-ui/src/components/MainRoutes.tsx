import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import PokemonDetails from "./PokemonDetails";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

const MainRoutes: FC = () => (
	<Routes>
		<Route path="/pokemon" element={<App />}>
			<Route
				index
				element={
					<Flex flexDir="column">
						<SearchBar />
						<SearchResults />
					</Flex>
				}
			/>
			<Route path=":pokemonId" element={<PokemonDetails />} />
		</Route>
		<Route path="*" element={<Navigate to="/pokemon" />} />
	</Routes>
);

export default MainRoutes;
