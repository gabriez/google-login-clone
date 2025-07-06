
interface Props {
  label: string,
  onClick: () => void
}

export default function LinkText({label, onClick}: Props) {
  return (
    <button onClick={onClick} className="px-3 py-2 text-black text-sm font-roboto active:bg-blueBg rounded-md cursor-pointer">
      {label}
    </button>
  )
}