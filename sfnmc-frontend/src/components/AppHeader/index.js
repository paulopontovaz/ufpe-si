import logo from "../../assets/images/logo.svg";
import "./styles.css";

const AppHeader = () => {
	return (
		<div className="app-header">
			<img src={logo} alt="App Logo" className="app-header-logo" />
			<span className="app-header-app-name">SFNMC</span>
		</div>
	);
};

export default AppHeader;
