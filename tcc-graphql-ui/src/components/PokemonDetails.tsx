import startCase from "lodash.startcase";
import { ArrowBackIcon, ArrowForwardIcon, SearchIcon } from "@chakra-ui/icons";
import {
	HStack,
	Button,
	Flex,
	Heading,
	Image,
	StackDivider,
	VStack,
	Text,
	SimpleGrid,
	Stat,
	StatLabel,
	StatNumber,
} from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { useParams } from "react-router";
import { fetchPokemon } from "../store/detailsSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectSelectedPokemon } from "../store/selectors";
import {
	PokemonDamages,
	PokemonMisc,
	PokemonMoves,
	PokemonStats,
	PokemonType,
} from "../types/pokemon";
import { useNavigate } from "react-router-dom";

interface GeneralPokemonDataOwnProps {
	readonly children?: React.ReactNode;
	readonly keyValueMap?: PokemonDamages | PokemonStats;
	readonly title: string;
}

const GeneralPokemonDataComp: FC<GeneralPokemonDataOwnProps> = ({
	children,
	keyValueMap,
	title,
}) => (
	<Flex direction="column" w="100%" mb="3rem">
		<Heading size="lg">{title}</Heading>
		<VStack
			mt="1rem"
			divider={<StackDivider borderColor="gray.200" />}
			spacing={2}
			align="stretch"
		>
			{children ||
				(keyValueMap &&
					Object.entries(keyValueMap).map(([key, value]) => (
						<Flex key={`${key}-${value}`}>
							<Text>
								<strong>{key.toUpperCase()}</strong>
							</Text>
							<Text ml="0.5rem">{value}</Text>
						</Flex>
					)))}
		</VStack>
	</Flex>
);

const PokemonMovesComp: FC<{ moves: PokemonMoves["level"] }> = ({ moves }) => (
	<GeneralPokemonDataComp title="Moves">
		{moves.map(({ learnedat, name }) => (
			<Flex align="center" key={`${name}-${learnedat}`}>
				<Text>
					<strong>{startCase(name)}</strong>
				</Text>
				<Text as="sub" ml="1rem">
					(
					{learnedat
						? `Learned at level: ${learnedat}`
						: "From the start"}
					)
				</Text>
			</Flex>
		))}
	</GeneralPokemonDataComp>
);

const PokemonTypeComp: FC<{ types: PokemonType[] }> = ({ types }) => (
	<Flex direction="column" align="center" mb="2rem">
		<Text fontSize="1.5rem">Type(s)</Text>
		<HStack divider={<StackDivider borderColor="gray.200" />}>
			{types.map((type) => (
				<Text key={type}>{type}</Text>
			))}
		</HStack>
	</Flex>
);

const PokemonMiscComp: FC<{ misc: PokemonMisc }> = ({ misc }) => (
	<SimpleGrid columns={3} spacing={10} mb="3rem">
		<Stat direction="column">
			<StatLabel>Normal Abilities</StatLabel>
			<HStack divider={<StackDivider borderColor="gray.200" />}>
				{misc.abilities.normal.map((ability: string) => (
					<Text key={ability}>{ability}</Text>
				))}
			</HStack>
		</Stat>
		<Stat direction="column">
			<StatLabel>Hidden Abilities</StatLabel>
			<HStack divider={<StackDivider borderColor="gray.200" />}>
				{misc.abilities.hidden.map((ability: string) => (
					<Text key={ability}>{ability}</Text>
				))}
			</HStack>
		</Stat>
		<Stat direction="column">
			<StatLabel>Classification</StatLabel>
			<Text>{startCase(misc.classification)}</Text>
		</Stat>
		<Stat direction="column">
			<StatLabel>Height (ft,in)</StatLabel>
			<StatNumber>{misc.height}</StatNumber>
		</Stat>
		<Stat direction="column">
			<StatLabel>Weight (lbs)</StatLabel>
			<StatNumber>{misc.weight}</StatNumber>
		</Stat>
	</SimpleGrid>
);

const PokemonDetails: FC = () => {
	const { pokemonId } = useParams();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const selectedPokemon = useAppSelector(selectSelectedPokemon);

	useEffect(() => {
		const routePokemonId = pokemonId && parseInt(pokemonId, 10);
		const isNewRoutePokemonId = selectedPokemon?.id != routePokemonId;
		const isPokemonNotLoaded = !selectedPokemon;

		if (routePokemonId && (isNewRoutePokemonId || isPokemonNotLoaded)) {
			dispatch(fetchPokemon(routePokemonId));
		}
	}, [pokemonId]);

	if (!selectedPokemon) {
		return null;
	}

	const handlePreviousClick = () => {
		const previousPokemonId =
			selectedPokemon.id == 1 ? 151 : selectedPokemon.id - 1;
		navigate(`../${previousPokemonId}`, { replace: true });
	};

	const handleNextClick = () => {
		const nextPokemonId =
			selectedPokemon.id == 151 ? 1 : selectedPokemon.id + 1;
		navigate(`../${nextPokemonId}`, { replace: true });
	};

	const handleBackToSearchClick = () => navigate(`..`, { replace: true });

	return (
		<Flex flexDir="column" alignItems="center" flex="1">
			<Flex w="100%" justify="space-between">
				<Button
					leftIcon={<ArrowBackIcon />}
					onClick={handlePreviousClick}
				>
					Previous
				</Button>
				<Button
					rightIcon={<SearchIcon />}
					onClick={handleBackToSearchClick}
				>
					Back to search
				</Button>
				<Button
					rightIcon={<ArrowForwardIcon />}
					onClick={handleNextClick}
				>
					Next
				</Button>
			</Flex>
			<Heading mt="3rem">
				{selectedPokemon.name} #{selectedPokemon.id}
			</Heading>
			<Image
				my="3rem"
				src={selectedPokemon.img}
				alt={selectedPokemon.name}
				objectFit="contain"
			/>
			<PokemonTypeComp types={selectedPokemon.type} />
			<PokemonMiscComp misc={selectedPokemon.misc} />
			<GeneralPokemonDataComp
				title="Stats"
				keyValueMap={selectedPokemon.stats}
			/>
			<GeneralPokemonDataComp
				title="Damage Multipliers"
				keyValueMap={selectedPokemon.damages}
			/>
			<PokemonMovesComp moves={selectedPokemon.moves.level} />
		</Flex>
	);
};

export default PokemonDetails;
