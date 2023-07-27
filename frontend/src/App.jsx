// GeoComponent.js
import React from "react";
import CallerTab from "./components/CallerTab/CallerTab";
import MapContainer from "./components/MapView/MapContainer";
import { RecoilRoot } from "recoil";

const App = () => {
	return (
		<RecoilRoot>
			<div className="app-container">
				<MapContainer />
				<CallerTab />
			</div>
		</RecoilRoot>
	);
};

export default App;
