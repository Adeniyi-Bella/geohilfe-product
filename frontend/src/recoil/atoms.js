// atoms.js
import { atom } from "recoil";

export const callPickedState = atom({
	key: "callPickedState",
	default: "red",
});

export const keywordArrayState = atom({
	key: "keywordsArray",
	default: [],
});

export const setOverlay = atom({
	key: "toggleOverlay",
	default: false,
});
