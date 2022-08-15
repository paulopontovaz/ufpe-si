import { Wrap } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchPokemonList } from "../store/listSlice";
import { selectPokemonList } from "../store/selectors";
import PokemonListItem from "./PokemonListItem";

const SearchResults: FC = () => {
	const dispatch = useAppDispatch();
	const pokemonList = useAppSelector(selectPokemonList);

	useEffect(() => {
		dispatch(fetchPokemonList());
	}, []);

	return (
		<Wrap mt="2rem" justify="center" spacing="0.5rem">
			{pokemonList.map((pokemon) => (
				<PokemonListItem key={pokemon.id} pokemon={pokemon} />
			))}
		</Wrap>
	);
};

export default SearchResults;
