import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCaretDown, faCaretUp} from '@fortawesome/free-solid-svg-icons';

import { useEffect, useRef, useState } from 'react';

interface Props {
  listOptions: string[]
  onSelect: (value: string) => void,
}

export default function DropdownMenu({listOptions, onSelect}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(listOptions[0]);

  // For dynamic positioning of dropdown
  const [dropUp, setDropUp] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // For outside clicked
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropDown = () => {
    setIsOpen(prev => !prev);
  }

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    onSelect(option);
  }

  useEffect(() => {
    if (isOpen && buttonRef.current){
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      setDropUp(spaceBelow < 160 && spaceAbove > spaceBelow);
    }
  }, [isOpen]);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className='relative font-roboto' ref={dropdownRef}>
      
      {/* Dropdown trigger */}
      <button 
        ref={buttonRef}
        onClick={toggleDropDown} 
        className='bg-inherit w-40 px-2 py-1 text-sm text-black rounded-md flex justify-between items-center gap-2 cursor-pointer hover:bg-hoverBg dark:hover:bg-dark-black-hover dark:text-white'>
        {selected}
        <FontAwesomeIcon icon={isOpen ? faCaretUp : faCaretDown} className='text-black dark:text-white'/>
      </button>  

      {/* Dropdown menu */}
      {
        isOpen && 
        <div className={`absolute w-48 z-50 origin-top-right bg-white shadow-lg border border-gray-200 rounded ${dropUp ? "bottom-full mb-2" : "mt-2 top-full"} dark:bg-dark-menu`}>
          <ul className='max-h-60 overflow-y-auto'>
            {
              listOptions.map((option, index) => (
                <li 
                  key={index} 
                  onClick={() => handleSelect(option)}
                  className='px-4 py-2 text-sm text-black cursor-pointer hover:bg-blueBg dark:text-white dark:hover:bg-dark-black-hover'>
                  {option}
                </li>
              )) 
            }
          </ul>
        </div>
      }


    </div>
    
  )
}