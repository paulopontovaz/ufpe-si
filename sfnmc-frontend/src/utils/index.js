let connection = new WebSocket("ws://localhost:5000");
connection.binaryType = "arraybuffer";

export const getWebSocketConnection = (newConnection = false) => {
	if (newConnection) {
		connection = connection = new WebSocket("ws://localhost:5000");
		connection.binaryType = "arraybuffer";
	}

	return connection;
};
