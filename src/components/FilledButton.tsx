
interface Props {
  label: string,
  onClick: () => void
}

export default function FilledButton({label, onClick} : Props) {
  return (
    <button onClick={onClick} className="px-6 py-2.5 bg-blue-acc text-sm text-white font-roboto font-medium rounded-full cursor-pointer hover:bg-blue-dark hover:drop-shadow-sm">
      {label}
    </button>
  )
}