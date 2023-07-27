import React, { useState } from "react";
import SuggestionContent from "./SuggestionContent";
import Keywords from "./Keywords";
import PropTypes from "prop-types";

const ParentContent = ({ setSelectedKeyword }) => {
	const [activeTab, setActiveTab] = useState(0);

	const handleTabClick = (index) => {
		setActiveTab(index);
	};

	const handleSelectedLocation = (location) => {
		setSelectedKeyword(location);
	};

	return (
		<div className="container">
			<div className="tabs">
				<div
					className={activeTab === 0 ? "active" : ""}
					onClick={() => handleTabClick(0)}
				>
					Keywords
				</div>
				<div
					className={activeTab === 1 ? "active" : ""}
					onClick={() => handleTabClick(1)}
				>
					Suggestions
				</div>
				<div
					style={{
						cursor: "pointer",
						padding: "15px 16px",
					}}
					className={activeTab === 2 ? "active" : ""}
					onClick={() => handleTabClick(2)}
				>
					Questions
				</div>
			</div>
			{activeTab === 0 && (
				<Keywords setSelectedLocation={handleSelectedLocation} />
			)}
			{activeTab === 1 && <SuggestionContent location={location} />}{" "}
		</div>
	);
};

ParentContent.propTypes = {
	setSelectedKeyword: PropTypes.func,
};

export default ParentContent;
