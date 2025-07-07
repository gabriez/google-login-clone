
interface Props {
  label: string,
  onClick: () => void
}

export default function LinkText({label, onClick}: Props) {
  return (
    <button onClick={onClick} className="px-3 py-2 text-black text-sm font-roboto hover:bg-hoverBg rounded-md cursor-pointer dark:text-white dark:hover:bg-dark-black-hover">
      {label}
    </button>
  )
}