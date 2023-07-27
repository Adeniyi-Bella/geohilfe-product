import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	// faShoppingCart,
	faUtensils,
	faParking,
	faHotel,
	faGasPump,
	faCoffee,
	faCreditCard,
	// faCir
	// faMapMarker,
} from "@fortawesome/free-solid-svg-icons";
const markerConfig = [
	{
		restaurant: {
			className: "marker",
			icon: <FontAwesomeIcon icon={faUtensils} />,
			maxZoom: 13,
		},
	},

	{
		hotel: {
			className: "marker",
			icon: <FontAwesomeIcon icon={faHotel} />,
			maxZoom: 13,
		},
	},
	{
		"coffee shop": {
			className: "marker",
			icon: <FontAwesomeIcon icon={faCoffee} />,
			maxZoom: 13,
		},
	},
	{
		"gas station": {
			className: "marker",
			icon: <FontAwesomeIcon icon={faGasPump} />,
			maxZoom: 13,
		},
	},
	{
		park: {
			className: "marker",
			icon: <FontAwesomeIcon icon={faParking} />,
			maxZoom: 13,
		},
	},
	{
		atm: {
			className: "marker",
			icon: <FontAwesomeIcon icon={faCreditCard} />,
			maxZoom: 13,
		},
	},
];
export { markerConfig };
