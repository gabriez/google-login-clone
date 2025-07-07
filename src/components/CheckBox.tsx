
interface Props {
  label: string,
  isChecked: boolean,
  onChange: () => void,
}

export default function CheckBox({label, isChecked, onChange}: Props) {
  return (
    <label className="flex items-center jusitfy-between gap-5">
      <input 
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="h-5 w-5 text-blue-acc rounded border-black border-4"
      />
      <span className="font-roboto text-sm">
        {label}
      </span>
    </label>  
  )
}