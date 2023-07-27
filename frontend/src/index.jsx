// index.js
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Routing from "./routes/Routes";
// import GeoComponent from "./components/GeoUI/GeoComponent";
import "./styles.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Routing />
	</StrictMode>
);
