// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import App from "../App";
const Routing = () => {
	return (
		<div>
			<Router>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/app" element={<App />} />
				</Routes>
			</Router>
		</div>
	);
};

export default Routing;
