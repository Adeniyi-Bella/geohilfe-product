import React from "react";
import PropTypes from "prop-types";
import "./NavBar.css"; // Import the CSS file
import GeoHilfeLogo from "../Logo/GeoHilfeLogo";
import UserAvatar from "../SvgIcons/UserAvatar";
import TablerSearch from "../SvgIcons/TablerSearch";
import { useSetRecoilState } from "recoil";
import { setOverlay } from "../../recoil/atoms";

const NavBar = ({ openCloseTab, currentState }) => {
	const overlayTrue = useSetRecoilState(setOverlay);

	const checkState = currentState;
	const character = checkState ? "..." : "...";
	const setTabVisuals = () => {
		openCloseTab(!currentState);
	};
	const setOverlayTrue = () => {
		overlayTrue(true);
	};
	return (
		<div className="navbar">
			<div className="navbar-logo">
				<GeoHilfeLogo />
				<span className="navbar-title">GeoHilfe</span>
			</div>
			<div className="navbar-actions">
				<TablerSearch />
				<div className="navbar-user-icon">
					<UserAvatar />
				</div>
				<button className="navbar-button" onClick={setOverlayTrue}>
					Send Location
				</button>
				<span className="navbar-tab" onClick={setTabVisuals}>
					{character}
				</span>
			</div>
		</div>
	);
};

NavBar.propTypes = {
	currentState: PropTypes.bool,
	openCloseTab: PropTypes.func,
};

export default NavBar;
