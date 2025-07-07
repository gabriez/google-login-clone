import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser, faCaretDown } from "@fortawesome/free-solid-svg-icons";

interface Props {
  email: string,
}

export default function DropdownButton({email}: Props) {
  return (
    <button className="bg-white p-1 pr-2 rounded-full border border-black flex justify-around items-center gap-2 text-sm font-roboto cursor-pointer">
      
      {/* Profile Icon */}
      <FontAwesomeIcon icon={faCircleUser} className="text-xl" />

      {/* email address */}
      {email}

      {/* Dropdown Icon */}
      <FontAwesomeIcon icon={faCaretDown} />
    </button>
  )
}