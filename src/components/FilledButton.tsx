interface Props {
	label: string;
	onClick: (e: any) => void;
}

export default function FilledButton({ label, onClick }: Props) {
	return (
		<button
			onClick={onClick}
			className="px-6 py-2.5 bg-blue-acc text-sm text-white font-roboto font-medium rounded-full cursor-pointer hover:bg-blue-dark hover:drop-shadow-sm dark:bg-dark-blue dark:text-dark-text dark:hover:bg-dark-blue-hover">
			{label}
		</button>
	);
}
