import React from "react";
import PropTypes from "prop-types";

const Footer = ({ currentState, zoomIn, zoomOut }) => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				position: "absolute",
				zIndex: 1,
				top: "600px",
				gap: !currentState ? "1230px" : "850px",
				paddingLeft: "50px",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					fontSize: "20px",
					background: "#2E3646",
					color: "#FFFFFF",
					borderRadius: "50%",
					width: "50px", // Adjust the width to your desired size
					height: "50px", // Adjust the height to your desired size
				}}
			>
				?
			</div>
			<div
				style={{
					display: "flex",
					gap: "15px",
					justifyContent: "center",
					alignItems: "center",
					fontSize: "20px",
					background: "#2E3646",
					color: "#FFFFFF",
					width: "70px", // Adjust the width to your desired size
					height: "30px", // Adjust the height to your desired size
				}}
			>
				<span
					style={{
						cursor: "pointer",
					}}
					onClick={zoomOut}
				>
					-
				</span>
				<span
					style={{
						cursor: "pointer",
					}}
					onClick={zoomIn}
				>
					+
				</span>
			</div>
		</div>
	);
};

Footer.propTypes = {
	currentState: PropTypes.bool,
	zoomIn: PropTypes.func,
	zoomOut: PropTypes.func,
};
export default Footer;
