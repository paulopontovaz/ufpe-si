import { useSelector } from "react-redux";
import AppHeader from "../AppHeader";
import OriginSelector from "../OriginSelector";
import RecommendedFlightList from "../RecommendedFlightList";
import "./styles.css";

const App = () => {
	const recommendedFlights = useSelector(
		(state) => state.flightRecommendation.recommendedFlights
	);

	return (
		<div className="app">
			<AppHeader />
			<OriginSelector />
			<RecommendedFlightList destinations={recommendedFlights} />
		</div>
	);
};

export default App;
