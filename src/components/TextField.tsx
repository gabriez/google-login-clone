
interface Props {
  label: string,
  value: string,
  onChange: (value: string) => void,
}

export default function TextField({label, value, onChange} : Props) {

  return (
    <label className="relative">
      {/* Input Field */}
      <input 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text" 
        className="w-full p-4 text-md text-black font-roboto outline-none border-2 border-gray-500 rounded-md duration-200 peer focus:border-blue-acc bg-inherit dark:text-white dark:focus:border-dark-blue"
      />

      {/* Placeholder / Label */}
      <span className={`absolute left-0 top-1/2 -translate-y-1/2 bg-white ml-4 text-md tracking-wide pointer-events-none duration-200 peer-focus:text-blue-acc peer-focus:text-sm peer-focus:-translate-y-10 peer-focus:px-2 ${value && "text-black text-sm -translate-y-10 px-2"} dark:text-white dark:bg-dark-second dark:peer-focus:text-dark-blue`}>
        {label}
      </span>
    </label>
  )
}