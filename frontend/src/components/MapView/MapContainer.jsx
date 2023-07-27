import React, { useEffect, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import { useRecoilState } from "recoil";
import { setOverlay } from "../../recoil/atoms";
import "./MapContainer.css";
import mapboxgl from "!mapbox-gl";
import ParentContent from "../Sidebar/ParentContent";
import NavBar from "../NavBar/NavBar";
import { markerConfig } from "../../fakeData/LocationIcon";

// eslint-disable-next-line no-undef
mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_ACCESS_TOKEN;

function MapContainer() {
	const [selectedLocation, setSelectedLocation] = useState("");
	const [isOverlayVisible, setisOverlayVisible] = useRecoilState(setOverlay);
	const [mapLoaded, setMapLoaded] = useState(false);
	const mapContainerRef = useRef(null);
	const mapRef = useRef(null);
	const markersRef = useRef([]);
	const [controlTab, setControlTab] = useState(true);
	const [gpsValue, setGpsValue] = useState([]);
	const [getSimiScore, setgetSimiScore] = useState(0);

	// load the map
	useEffect(() => {
		let map;
		if (!mapLoaded) {
			map = new mapboxgl.Map({
				container: mapContainerRef.current,

				style: "mapbox://styles/mapbox/streets-v11",
				center: [9.261059, 47.69558528307423],
				zoom: 9,
			});

			map.on("load", () => {
				setMapLoaded(true);
				mapRef.current = map;
			});
		}

		if (mapLoaded) {
			if (!mapRef.current.getSource("polygon")) {
				mapRef.current.addSource("polygon", {
					type: "geojson",
					data: {
						type: "Feature",
						geometry: {
							type: "Polygon",
							coordinates: [
								[
									[9.284686, 47.692801],
									[9.260359486191872, 47.70325975749226],
									[9.256533929961462, 47.688583416502645],
								],
							],
						},
					},
				});

				mapRef.current.addLayer({
					id: "polygon",
					type: "fill",
					source: "polygon",
					layout: {},
					paint: {
						"fill-color": "rgba(34, 149, 255, 0.4)",
						"fill-outline-color": "rgba(0, 0, 0, 0)",
					},
				});

				const size = 200;

				// This implements `StyleImageInterface`
				// to draw a pulsing dot icon on the map.
				const pulsingDot = {
					width: size,
					height: size,
					data: new Uint8Array(size * size * 4),

					// When the layer is added to the map,
					// get the rendering context for the map canvas.
					onAdd: function () {
						const canvas = document.createElement("canvas");
						canvas.width = this.width;
						canvas.height = this.height;
						this.context = canvas.getContext("2d");
					},

					// 			// Call once before every frame where the icon will be used.
					render: function () {
						const duration = 1000;
						const t = (performance.now() % duration) / duration;

						const radius = (size / 2) * 0.3;
						const outerRadius = (size / 2) * 0.7 * t + radius;
						const context = this.context;

						// Draw the outer circle.
						context.clearRect(0, 0, this.width, this.height);
						context.beginPath();
						context.arc(
							this.width / 2,
							this.height / 2,
							outerRadius,
							0,
							Math.PI * 2
						);
						context.fillStyle = `rgba(84,180,53, ${1 - t})`;
						context.fill();

						// Draw the inner circle.
						context.beginPath();
						context.arc(
							this.width / 2,
							this.height / 2,
							radius,
							0,
							Math.PI * 2
						);
						context.fillStyle = "rgba(144, 238, 144, 1)";
						context.strokeStyle = "white";
						context.lineWidth = 2 + 4 * (1 - t);
						context.fill();
						context.stroke();

						// Update this image's data with data from the canvas.
						this.data = context.getImageData(
							0,
							0,
							this.width,
							this.height
						).data;

						// Continuously repaint the map, resulting
						// in the smooth animation of the dot.
						mapRef.current.triggerRepaint();

						// Return `true` to let the map know that the image was updated.
						return true;
					},
				};

				mapRef.current.addImage("pulsing-dot", pulsingDot, {
					pixelRatio: 2,
				});

				mapRef.current.addSource("dot-point", {
					type: "geojson",
					data: {
						type: "FeatureCollection",
						features: [
							{
								type: "Feature",
								geometry: {
									type: "Point",
									coordinates: [9.3316, 48.0498], // icon position [lng, lat]
								},
							},
						],
					},
				});
			}

			return () => {
				if (mapRef.current.getLayer("polygon")) {
					mapRef.current.removeLayer("polygon");
				}
				if (mapRef.current.getSource("polygon")) {
					mapRef.current.removeSource("polygon");
				}

				markersRef.current.forEach((marker) => {
					marker.remove();
				});
				markersRef.current = [];
			};
		}
	}, [mapLoaded]);

	// zoom into selected location
	useEffect(() => {
		if (!selectedLocation || !mapRef.current) return;
		if (typeof selectedLocation === "string") {
			mapRef.current.flyTo({
				center: [9.268269, 47.699975],
				zoom: 15,
			});
		} else {
			if (
				typeof selectedLocation === "object" &&
				Array.isArray(selectedLocation) &&
				Object.keys(selectedLocation[0]).includes("grid_number")
			) {
				setGpsValue(selectedLocation[0].grid_coordinate);
				mapRef.current.flyTo({
					center: [
						selectedLocation[0].grid_coordinate[0],
						selectedLocation[0].grid_coordinate[1],
					],
					zoom: 16,
				});
			}
		}
	}, [selectedLocation]);

	// add location marker to map
	useEffect(() => {
		if (mapRef.current && mapLoaded && selectedLocation) {
			if (typeof selectedLocation === "string") {
				return;
			} else {
				if (
					typeof selectedLocation === "object" &&
					!Array.isArray(selectedLocation)
				) {
					// Check if the source already exists, then update its data
					if (!mapRef.current.getSource("squarePolygon")) {
						mapRef.current.addSource("squarePolygon", {
							type: "geojson",
							data: {
								type: "Feature",
								geometry: {
									type: "Polygon",
									coordinates: [],
								},
							},
						});
						mapRef.current.addLayer({
							id: "squarePolygon",
							type: "fill",
							source: "squarePolygon",
							layout: {},
							paint: {
								"fill-color": "rgba(0, 0, 0, 0)",
								"fill-outline-color": "rgba(34, 149, 255, 1)",
							},
						});
					}
					let squarePolygonCoordinates = [];
					selectedLocation.grids.forEach((grid) => {
						const PolygonCoordinates = [
							[grid.northeast[1], grid.northeast[0]],
							[grid.northwest[1], grid.northwest[0]],
							[grid.southwest[1], grid.southwest[0]],
							[grid.southeast[1], grid.southeast[0]],
							[grid.northeast[1], grid.northeast[0]], // To close the square
						];
						squarePolygonCoordinates.push(PolygonCoordinates);
					});
					// Update the data for the "squarePolygon" source with the current grids' coordinates
					mapRef.current.getSource("squarePolygon").setData({
						type: "Feature",
						geometry: {
							type: "Polygon",
							coordinates: squarePolygonCoordinates,
						},
					});
				} else if (
					Object.keys(selectedLocation[0]).includes("grid_number")
				) {
					markersRef.current.forEach((marker) => {
						const elementsToRemove = marker
							.getElement()
							.getElementsByClassName("marker-text");

						// Convert the HTMLCollection to an array and remove each element
						Array.from(elementsToRemove).forEach((element) =>
							element.remove()
						);
					});
					setgetSimiScore(
						(selectedLocation[0].similarity_score * 100).toFixed(
							1
						) + "%"
					);
					selectedLocation.forEach((coord) => {
						const [lat, lng] = coord.grid_coordinate;
						const simiScore =
							(coord.similarity_score * 100).toFixed(1) + "%";
						const markerElement = document.createElement("div");
						markerElement.className = "simi-score-marker";
						const containerElement = document.createElement("div");
						containerElement.className = "marker-container";
						const textElement = document.createElement("div");
						textElement.className = "marker-text";
						textElement.textContent = simiScore.toString();
						containerElement.appendChild(textElement);
						markerElement.appendChild(containerElement);
						const marker = new mapboxgl.Marker({
							element: markerElement,
						})
							.setLngLat([lat, lng])
							.addTo(mapRef.current);
						markersRef.current.push(marker);
					});
				} else {
					const createMArkerConfig = markerConfig.find(
						(obj) =>
							selectedLocation[0].properties.Category.toLowerCase() in
							obj
					);
					if (createMArkerConfig) {
						const { className, icon } =
							createMArkerConfig[
								selectedLocation[0].properties.Category.toLowerCase()
							];
						selectedLocation.forEach((coord) => {
							const [lng, lat] = coord.geometry.coordinates;
							const markerElement = document.createElement("div");
							markerElement.className = className;
							createRoot(markerElement).render(icon);
							const marker = new mapboxgl.Marker({
								element: markerElement,
							})
								.setLngLat([lng, lat])
								.addTo(mapRef.current);
							markersRef.current.push(marker);
						});
					} else {
						selectedLocation.forEach((coord) => {
							const [lng, lat] = coord.geometry.coordinates;
							const markerElement = document.createElement("div");
							markerElement.className = "small-circle";
							const marker = new mapboxgl.Marker({
								element: markerElement,
							})
								.setLngLat([lng, lat])
								.addTo(mapRef.current);
							markersRef.current.push(marker);
						});
					}
				}
			}
		}
	}, [selectedLocation, mapLoaded]);
	// update selected location
	const handleSelectedLocation = (location) => {
		setSelectedLocation(location);
	};
	const handleCloseOverlay = () => {
		setisOverlayVisible(false);
	};

	return (
		<div>
			{isOverlayVisible && (
				<div className="overlay">
					<div className="display-gps">
						<h4>
							The Patient is Located in the below GPS Coordinates
						</h4>
						<p>Latitude: {gpsValue[1]}</p>
						<p>Longitude: {gpsValue[0]}</p>
						<p>Probability: {getSimiScore}</p>
					</div>
					<button
						className="close-button"
						onClick={handleCloseOverlay}
					>
						Send Location to emergency Team
					</button>
				</div>
			)}{" "}
			<NavBar openCloseTab={setControlTab} currentState={controlTab} />
			<div>
				{controlTab && (
					<ParentContent
						setSelectedKeyword={handleSelectedLocation}
					/>
				)}
			</div>
			<div
				ref={mapContainerRef}
				id="map-container"
				className="map-container"
			></div>
		</div>
	);
}
export default MapContainer;
