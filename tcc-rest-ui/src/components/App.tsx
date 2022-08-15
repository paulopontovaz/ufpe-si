import { Flex, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const App: FC = () => (
	<Flex
		className="App"
		h="100%"
		flexDirection="column"
		justify="space-between"
	>
		<Heading
			boxShadow="lg"
			p={4}
			mb={4}
			backgroundColor="#41AED9"
			color="#F2EB88"
			textShadow="5px 5px 0px #2C7BBF"
		>
			PokéSearch
		</Heading>
		<Flex p={4}>
			<Outlet />
		</Flex>
	</Flex>
);

export default App;
