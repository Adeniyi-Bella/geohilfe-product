// import axios from "axios";
// const KEYWORDS_API_URL = "http://localhost:8000/keywords";

import axios from "axios";

export const sendKeywords = async (keywords) => {
	console.log(keywords);
	try {
		const response = await axios.post(
			"http://localhost:8000/similarity",
			{
				keywords: keywords,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return response.data;
	} catch (error) {
		throw new Error("Failed to send keywords.");
	}
};
export const sendBluecone = async () => {
	console.log("sendBluecone");
	try {
		const response = await axios.post(
			"http://localhost:8000/bluecone",
			{
				cone_origin: [47.692801, 9.284686],
				cone_radius: 2000,
				cone_angle: 45,
				cone_direction: 280,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return response.data;
	} catch (error) {
		throw new Error("Failed to send keywords.");
	}
};
