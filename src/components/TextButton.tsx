
interface Props {
  label: string,
  onClick: () => void,
}

export default function TextButton({label, onClick} : Props) {
  return (
    <button onClick={onClick} className="px-6 py-2.5 text-blue-acc text-sm font-roboto font-medium rounded-full cursor-pointer hover:bg-blueBg transform -translate-x-4">
      {label}
    </button>
  )
}