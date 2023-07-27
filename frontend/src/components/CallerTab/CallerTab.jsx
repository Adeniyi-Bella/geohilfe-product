/* eslint-disable indent */
import React, { useState } from "react";
import "./CallerTab.css";
import TelephoneIcon from "../SvgIcons/TelephoneIcon";
import DotSix from "../SvgIcons/DotSix";
import { useRecoilState } from "recoil";
import { callPickedState } from "../../recoil/atoms";

const CallerTab = () => {
	const [initialX, setInitialX] = useState(0);
	const [initialY, setInitialY] = useState(0);
	const [moveElement, setMoveElement] = useState(false);
	const callPicked = useRecoilState(callPickedState);
	console.log(callPicked);

	const handleStart = (e) => {
		e.preventDefault();
		const newX = e.clientX || e.touches[0].clientX;
		const newY = e.clientY || e.touches[0].clientY;
		setInitialX(newX);
		setInitialY(newY);
		setMoveElement(true);
	};

	// when dragging is happening
	const handleMove = (e) => {
		if (moveElement) {
			e.preventDefault();
			const newX = e.clientX || e.touches[0].clientX;
			const newY = e.clientY || e.touches[0].clientY;
			const draggableElem = document.getElementById("draggable-elem");
			draggableElem.style.top = `${
				draggableElem.offsetTop - (initialY - newY)
			}px`;
			draggableElem.style.left = `${
				draggableElem.offsetLeft - (initialX - newX)
			}px`;
			setInitialX(newX);
			setInitialY(newY);
		}
	};

	// when element is dropped
	const handleStop = () => {
		setMoveElement(false);
	};

	return (
		<>
			<div
				className="notification-container"
				id="draggable-elem"
				draggable="true"
				onMouseDown={handleStart}
				onMouseMove={handleMove}
				onMouseUp={handleStop}
				onTouchStart={handleStart}
				onTouchMove={handleMove}
				onTouchEnd={handleStop}
			>
				<div>
					<DotSix />
				</div>
				<div>00:00</div>
				<div className="anrufDiv">Incoming call</div>
				<div
					className="pickUpDiv"
					style={{
						background: callPicked[0],
					}}
				>
					<TelephoneIcon />
					<div
						style={{
							fontSize: "16px",
							fontFamily: "Pretendard, sans-serif",
						}}
					>
						Answer
					</div>
				</div>
			</div>
		</>
	);
};

export default CallerTab;
