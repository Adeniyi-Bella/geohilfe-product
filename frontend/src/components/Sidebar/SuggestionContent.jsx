import React from "react";
import "./ParentContent.css";
import PropTypes from "prop-types";

const SuggestionContent = ({ location }) => {
	return (
		<div className="tab-content">
			<div className="coordinatesDiv">
				<label>Latitude</label>
				<span className="coordinatesSpan"></span>
			</div>
			<div className="coordinatesDiv">
				<label>Longitude</label>
				<span className="coordinatesSpan"></span>
			</div>
			<hr />
			<div className="coordinatesDiv">
				<div>Suggestions Found (0)</div>
				<div>Filter</div>
			</div>
			<div className="coordinatesDiv">{location?.keyword}</div>
		</div>
	);
};

SuggestionContent.propTypes = {
	location: PropTypes.object,
};
export default SuggestionContent;
