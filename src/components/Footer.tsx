import DropdownMenu from "./DropdownMenu";

import { useState } from "react";
import LinkText from "./LinkText";

export default function Footer() {
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const listOfLanguage = [
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
  }

  return (
    <footer className="flex justify-between items-center">
      <div>
        <DropdownMenu listOptions={listOfLanguage} onSelect={handleSelectLanguage}/>
      </div>

      <div>
        <LinkText label="Help" onClick={() => console.log("Help")}/>
        <LinkText label="Privacy" onClick={() => console.log("Privacy")}/>
        <LinkText label="Terms" onClick={() => console.log("Terms")}/>
      </div>
    </footer>
  )
}