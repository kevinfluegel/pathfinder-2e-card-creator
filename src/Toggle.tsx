import React from "react";
import styles from './Toggle.module.css'

interface ToggleProps {
	isToggled: boolean;
	setToggled: (v: boolean) => void;
	label?: string;
}

const Toggle = ({isToggled, setToggled, label}: ToggleProps) => {

	function toggle() {
		setToggled(!isToggled);
	}

	return (
		<>
		<div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
			<input
				type="checkbox"
				name="toggle"
				id="toggle"
				checked={isToggled}
				onChange={toggle}
				className={`${styles.toggle} absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer`}
			/>
		</div>
			<label
				htmlFor="toggle"
				className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
			>
				{label}
			</label>
			</>
	);
};

export default Toggle;
