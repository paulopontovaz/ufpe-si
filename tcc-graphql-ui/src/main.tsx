import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import theme from "./theme";
import { Provider } from "react-redux";
import { store } from "./store/store";
import MainRoutes from "./components/MainRoutes";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<BrowserRouter>
					<MainRoutes />
				</BrowserRouter>
			</ChakraProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
