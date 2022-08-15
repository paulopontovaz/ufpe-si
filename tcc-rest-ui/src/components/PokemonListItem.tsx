import { useNavigate } from "react-router-dom";
import { Flex, Text, Image, Heading, WrapItem } from "@chakra-ui/react";
import { FC } from "react";
import { Pokemon } from "../types/pokemon";
import { useAppDispatch } from "../store/hooks";
import { setSelectedPokemons } from "../store/detailsSlice";

interface PokemonListItemOwnProps {
	readonly pokemon: Pokemon;
}

const getTypeList = (type: string, index: number, list: string[]) =>
	`${type}${list.length > 1 && index < list.length - 1 ? ", " : ""}`;

const PokemonListItem: FC<PokemonListItemOwnProps> = ({ pokemon }) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleOnClick = async () => {
		await dispatch(setSelectedPokemons(pokemon));
		navigate(`${pokemon.id}`, { replace: true });
	};

	return (
		<WrapItem
			p="1rem"
			mb="0.5rem"
			borderRadius="5px"
			boxShadow="lg"
			flexDirection="column"
			cursor="pointer"
			onClick={handleOnClick}
			flexDir="column"
			alignItems="center"
			justifyContent="space-between"
		>
			<Flex justifyContent="center" h="100%" maxWidth="128px">
				<Image
					src={pokemon.img}
					alt={pokemon.name}
					objectFit="contain"
				/>
			</Flex>
			<Flex flexDir="column" alignItems="center">
				<Heading size="sm" mt="0.5rem">
					{pokemon.name} #{pokemon.id}
				</Heading>
				<Text fontSize="xs">Types: </Text>
				<Text fontSize="xs">{pokemon.type.map(getTypeList)}</Text>
			</Flex>
		</WrapItem>
	);
};

export default PokemonListItem;
