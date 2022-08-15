import { useSelector } from "react-redux";
import { css } from "@emotion/react";
import BarLoader from "react-spinners/BarLoader";
import RecommendedFlightListItem from "../RecommendedFlightListItem";
import "./styles.css";

const loaderCss = css`
	width: 100%;
	align-self: center;
`;

const RecommendedFlights = ({ destinations = [] }) => {
	const isLoading = useSelector(
		(state) => state.flightRecommendation.isLoading
	);
	const message = useSelector((state) => state.flightRecommendation.message);
	return (
		<div className="recommended-flight-list">
			<div className="recommended-flight-list-table-container">
				<table className="recommended-flight-list-table">
					<thead>
						<tr>
							<th>País</th>
							<th>
								Número de Casos
								<br />
								(de COVID-19)
							</th>
							<th>
								Taxa de Crescimento
								<br />
								(de COVID-19)
							</th>
							<th>Preço</th>
						</tr>
					</thead>
					<BarLoader
						loading={isLoading}
						color="#d66853"
						size={250}
						css={loaderCss}
					/>
					{message && (
						<div className={"recommended-flight-list-message"}>
							<span className={message?.type || ""}>
								{message.body}
							</span>
						</div>
					)}
					{destinations.length > 0 && (
						<tbody>
							{destinations.map((destination) => (
								<RecommendedFlightListItem
									destination={destination}
								/>
							))}
						</tbody>
					)}
				</table>
			</div>
			<div className="recommended-flight-list-footer" />
		</div>
	);
};

export default RecommendedFlights;
