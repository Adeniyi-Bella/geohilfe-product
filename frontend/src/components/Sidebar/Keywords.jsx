import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useRecoilState } from "recoil";
import { useSetRecoilState } from "recoil";
import { keywordArrayState } from "../../recoil/atoms";
import { callPickedState } from "../../recoil/atoms";
import "./Keywords.css";
import { sendKeywords } from "../../services/BackendService";
import { sendBluecone } from "../../services/BackendService";

const webSocket = new WebSocket("ws://localhost:4007");

const Keywords = ({ setSelectedLocation }) => {
	const [newKeyword, setNewKeyword] = useState("");
	const [selectedKeyword, setSelectedKeyword] = useState([]);
	const [addKeyword, setaddKeyword] = useState([]);
	const [notNeededKeyword, setnotNeededKeyword] = useState([]);
	const [keywords, setKeywords] = useState([]);
	const setCallPicked = useSetRecoilState(callPickedState);
	const [uniqueKeywords, setUniqueKeywords] =
		useRecoilState(keywordArrayState);
	const newKeywordsRef = useRef([]);
	const keywordsInDB = [
		"gas station",
		"restaurant",
		"yoga",
		"bus station",
		"atm",
		"hotel",
		"bank",
		"bar",
		"car dealer",
		"car wash",
		"dentist",
		"cinema",
		"coffee shop",
		"embassy",
		"fire station",
		"grocery",
		"supermarket",
		"museum",
		"parking",
		"shopping mall",
		"sports center",
		"train station",
		"zoo",
		"school",
		"post office",
		"police station",
		"park",
		"motel",
		"library",
		"hospital",
	];
	useEffect(() => {
		webSocket.onmessage = async function (msg) {
			setCallPicked("green");
			const data = JSON.parse(msg.data);
			if (data.event === "interim-transcription") {
				const newKeywords = data.keywords;
				newKeywordsRef.current =
					newKeywordsRef.current.concat(newKeywords);
				appendNewKeywords();
			}
		};
	}, []);

	const appendNewKeywords = async () => {
		const newKeywords = newKeywordsRef.current;
		newKeywordsRef.current = []; // Reset newKeywords

		if (newKeywords.length > 0) {
			const url =
				"https://api.mapbox.com/datasets/v1/josephadd/clj2ntu1c02ze2aqhykv3opbb/features?access_token=pk.eyJ1Ijoiam9zZXBoYWRkIiwiYSI6ImNsaWRsd3Y5NjByZHEzZnFvbnhncGZtdnEifQ.dU-GFHpmYt4n4O7JEgc9wQ";

			try {
				const response = await axios.get(url);
				const features = response.data.features;
				newKeywords.forEach((newKeyword) => {
					const matchingKeywords = features.filter((feature) => {
						if (feature.properties.category) {
							return (
								feature.properties.category.toLowerCase() ===
								newKeyword.toLowerCase()
							);
						}
					});

					if (matchingKeywords.length === 0) {
						console.log(notNeededKeyword);
						setnotNeededKeyword((prevKeywords) => {
							const uniqueSet = new Set([
								...prevKeywords,
								...newKeywords,
							]);
							return Array.from(uniqueSet);
						});
					} else {
						const emptyArray = [];
						setUniqueKeywords((prevKeywords) => {
							const uniqueSet = new Set([
								...prevKeywords,
								...newKeywords,
							]);
							for (const item of uniqueSet) {
								if (keywordsInDB.includes(item)) {
									emptyArray.push(item);
								}
							}
							return emptyArray;
						});
					}
				});
			} catch (error) {
				alert(error.message);
			}
		}
	};

	useEffect(() => {
		const sendKeywordsAsync = async () => {
			try {
				if (keywords.length > 0) {
					const response = await sendKeywords(keywords);
					if (response) {
						setSelectedLocation(response);
					} else {
						throw new Error("No location found for this keyword");
					}
				} else {
					const blueconeResponse = await sendBluecone();
					setSelectedLocation(blueconeResponse);
				}
				// Handle the response or perform other logic after sending the keywords
			} catch (error) {
				console.error(error);
			}
		};
		sendKeywordsAsync();
	}, [keywords]);

	const getCoordinatesKeywords = async (keyword) => {
		//selected keywords array for background color
		if (selectedKeyword.includes(keyword)) {
			setSelectedKeyword(selectedKeyword.filter((kw) => kw !== keyword));
		} else {
			setSelectedKeyword([...selectedKeyword, keyword.toLowerCase()]);
		}
		// keywords to be passed on to similarity endpoint
		if (keywords.includes(keyword)) {
			setKeywords((prevKeywords) =>
				prevKeywords.filter((kw) => kw !== keyword)
			);
		} else {
			setKeywords((prevKeywords) => [
				...prevKeywords,
				keyword.toLowerCase(),
			]);
		}

		if (keyword === "meersburg") {
			setSelectedLocation(keyword);
		} else {
			const url =
				"https://api.mapbox.com/datasets/v1/josephadd/clj2ntu1c02ze2aqhykv3opbb/features?access_token=pk.eyJ1Ijoiam9zZXBoYWRkIiwiYSI6ImNsaWRsd3Y5NjByZHEzZnFvbnhncGZtdnEifQ.dU-GFHpmYt4n4O7JEgc9wQ";

			try {
				const response = await axios.get(url);
				const features = response.data.features;
				const matchingKeywords = features.filter((feature) => {
					if (feature.properties.Category) {
						return (
							feature.properties.Category.toLowerCase() ===
							keyword.toLowerCase()
						);
					}
				});
				if (matchingKeywords.length === 0) {
					// throw new Error("There is no ICON for this keyword");
					console.log("There is no ICON for this keyword");
					// return;
				} else {
					setSelectedLocation(matchingKeywords);
				}
			} catch (error) {
				alert(error);
			}
		}
	};

	const handleAddKeyword = (e) => {
		e.preventDefault();
		if (newKeyword.trim() !== "") {
			// const updatedKeywordsArray = [...uniqueKeywords, newKeyword];
			setaddKeyword((prevKeywords) => [
				...prevKeywords,
				newKeyword.toLowerCase(),
			]);
			setNewKeyword("");
		}
		getCoordinatesKeywords(newKeyword);
	};

	return (
		<div className="mainDiv">
			<div className="keyWordsDiv">
				<div className="keywordsHeaderDiv">
					<h5>Conversation</h5>
					<p>Click correct words during the dialogue</p>
				</div>
				<div id="keywordsSection" className="keywordsSection">
					{uniqueKeywords.map((keyword, index) => (
						<div
							key={index}
							className={`keywordsItem   ${
								selectedKeyword.includes(keyword)
									? "keywordColor"
									: "keywordsTab"
							}`}
							onClick={() => getCoordinatesKeywords(keyword)}
						>
							{keyword}
						</div>
					))}
				</div>
			</div>
			<div className="addKeywordsDiv">
				<div className="keywordsHeaderDiv">
					<h5>Add Keyword</h5>
					<p>Add your own keyword if neccessary</p>
				</div>
				<form className="addKeywordForm" onSubmit={handleAddKeyword}>
					<input
						className="addKeywordInput"
						type="text"
						placeholder="New keyword"
						value={newKeyword}
						onChange={(e) => setNewKeyword(e.target.value)}
						list="suggestedKeywords"
					/>
					<datalist id="suggestedKeywords">
						<option value="meersburg" />
						<option value="atm" />
						<option value="gas station" />
						<option value="restaurant" />
						<option value="hotel" />
						<option value="coffee shop" />
						<option value="park" />
						{/* <option value="edeka" /> */}
					</datalist>
					<button className="addKeywordButton" type="submit">
						+Add
					</button>
				</form>
				<div className="keywordsSection">
					{addKeyword.map((keyword, index) => (
						<div
							key={index}
							className={`keywordsItem   ${
								selectedKeyword.includes(keyword)
									? "keywordColor"
									: "keywordsTab"
							}`}
						>
							{keyword}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

Keywords.propTypes = {
	setSelectedLocation: PropTypes.func,
};

export default Keywords;
