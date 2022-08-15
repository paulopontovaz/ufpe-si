import { createSlice } from "@reduxjs/toolkit";
import { getWebSocketConnection } from "../utils";
import MessageType from "../types/message-type";

const initialState = {
	selectedOrigin: null,
	recommendedFlights: [],
	isLoading: false,
	message: undefined,
};

export const flightRecommendationSlice = createSlice({
	name: "flightRecommendation",
	initialState,
	reducers: {
		setMessage: (state, action) => {
			state.message = action.payload;
		},
		setIsLoading: (state, action) => {
			state.isLoading = Boolean(action.payload);
		},
		selectOrigin: (state, action) => {
			state.selectedOrigin = action.payload;
		},
		setRecommendedFlights: (state, action) => {
			state.recommendedFlights = action.payload || [];
		},
	},
});

export const { selectOrigin, setRecommendedFlights, setIsLoading, setMessage } =
	flightRecommendationSlice.actions;

export const submitSearch =
	(selectedOrigin = "") =>
	(dispatch) => {
		dispatch(setMessage());
		dispatch(setRecommendedFlights([]));
		dispatch(setIsLoading(true));

		const iata_from = selectedOrigin?.split("-")[0]?.trim();
		let connection = getWebSocketConnection();

		switch (connection.readyState) {
			case WebSocket.OPEN:
				connection.send(iata_from);
				connection.onmessage = ({ data }) => {
					// converte o buffer que vem da fila em uma string
					const converter = new TextDecoder("utf-8");
					const convertedData = converter.decode(data);

					// converte a string em um objeto
					const data2obj = JSON.parse(convertedData);

					console.log("Search Results:", data2obj);

					dispatch(setRecommendedFlights(data2obj));
					dispatch(setIsLoading(false));

					if (!data2obj?.length) {
						dispatch(
							setMessage({
								body: "[WebSocket onMessage]: Nenhum resultado foi encontrado para essa busca.",
								type: MessageType.INFO,
							})
						);
					}
				};
				break;
			case WebSocket.CLOSED:
				connection = getWebSocketConnection(true);
				console.log(
					"WebSocket.CLOSED -> Connection reopened. Try again."
				);
				dispatch(
					setMessage({
						body: "[WebSocket readyState CLOSED]: A conexão está fechada.",
						type: MessageType.WARNING,
					})
				);
				break;
			case WebSocket.CONNECTING:
				console.log("WebSocket.CONNECTING");
				dispatch(
					setMessage({
						body: "[WebSocket readyState CONNECTING]: Em processo de conexão com o servidor.",
						type: MessageType.WARNING,
					})
				);
				break;
			case WebSocket.CLOSING:
				console.log("WebSocket.CLOSING");
				dispatch(
					setMessage({
						body: "[WebSocket readyState CLOSING]: A conexão está fechando.",
						type: MessageType.WARNING,
					})
				);
				break;
			default:
				break;
		}

		connection.onopen = () => {
			console.log("connection.onopen");
		};

		connection.onerror = (error) => {
			console.log("connection.onerror", error);
			dispatch(setIsLoading(false));
			dispatch(
				setMessage({
					body: "[WebSocket onError]: A conexão com o servidor foi encerrada abruptamente.",
					type: MessageType.ERROR,
				})
			);
		};

		connection.onclose = () => {
			console.log("connection.onclose");
			dispatch(setIsLoading(false));
			dispatch(
				setMessage({
					body: "[WebSocket onClose]: A conexão com o servidor foi encerrada.",
					type: MessageType.WARNING,
				})
			);
		};
	};

export default flightRecommendationSlice.reducer;
