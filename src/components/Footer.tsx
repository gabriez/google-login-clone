import DropdownMenu from "./DropdownMenu";

import { useState } from "react";
import LinkText from "./LinkText";

export default function Footer() {
	const [selectedLanguage, setSelectedLanguage] = useState("");

	const listOfLanguage = [
		"Español (España)",
		"English",
		"Filipino",
		"German",
		"Korean",
		"Japanese",
		"Mandarin",
		"Indian",
		"Latin",
		"Bisaya",
		"Conyo",
		"Russian",
		"Hood Language",
	];

	const handleSelectLanguage = (value: string) => {
		setSelectedLanguage(value);
		console.log(selectedLanguage);
	};

	return (
		<footer className="flex justify-between items-center">
			<div>
				<DropdownMenu
					listOptions={listOfLanguage}
					onSelect={handleSelectLanguage}
				/>
			</div>

			<div>
				<LinkText label="Ayuda" onClick={() => console.log("Ayuda")} />
				<LinkText
					label="Privacidad"
					onClick={() => console.log("Privacidad")}
				/>
				<LinkText label="Términos" onClick={() => console.log("Términos")} />
			</div>
		</footer>
	);
}
