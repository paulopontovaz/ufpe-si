import { Search2Icon } from "@chakra-ui/icons";
import {
	Flex,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../store/hooks";
import { fetchPokemonList } from "../store/listSlice";

const searchFieldName = "searchQuery";

interface PokemonSearchFormType {
	[searchFieldName]: string;
}

const SearchBar: FC = () => {
	const dispatch = useAppDispatch();
	const { register, handleSubmit } = useForm();

	const onSearchSubmit = (data: PokemonSearchFormType) => {
		console.log(data);
		dispatch(fetchPokemonList(data?.[searchFieldName]));
	};

	return (
		<Flex justify="center">
			<form onSubmit={handleSubmit(onSearchSubmit)}>
				<InputGroup size="md">
					<Input
						pl={2}
						pr="3rem"
						size="lg"
						placeholder="Search for a Pokémon..."
						{...register(searchFieldName)}
						variant="flushed"
					/>
					<InputRightElement>
						<IconButton
							type="submit"
							aria-label="Search for a specific Pokémon"
							icon={<Search2Icon color="grey" />}
							variant="ghost"
						/>
					</InputRightElement>
				</InputGroup>
			</form>
		</Flex>
	);
};

export default SearchBar;
