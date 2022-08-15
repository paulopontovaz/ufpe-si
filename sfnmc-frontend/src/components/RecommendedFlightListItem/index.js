import "./styles.css";

const RecommendedFlightListItem = ({
	destination: {
		countryCode,
		countryName,
		cases,
		contaminationRate,
		price,
		currency,
		flag_link,
	},
}) => (
	<tr key={countryCode} className="recommended-flight-list-item">
		<td className="recommended-flight-list-item-country">
			<img src={flag_link} alt={`${countryCode} flag`} />
			<p>{countryName}</p>
		</td>
		<td>{cases}</td>
		<td
			className={
				contaminationRate > 0
					? "red"
					: contaminationRate < 0
					? "green"
					: ""
			}
		>
			{contaminationRate > 0
				? `+${contaminationRate}%`
				: `${contaminationRate}%`}
		</td>
		<td>{`${price} ${currency.toUpperCase()}`}</td>
	</tr>
);

export default RecommendedFlightListItem;
