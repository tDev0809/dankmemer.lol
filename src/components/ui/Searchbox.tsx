import { Dispatch, SetStateAction } from "react";

interface Props {
	placeholder: string;
	setSearch: Dispatch<SetStateAction<string>>;
}

export default function Searchbox({ placeholder, setSearch }: Props) {
	return (
		<div className="flex items-center text-gray-400 space-x-1">
			<div className="material-icons">search</div>
			<input
				onChange={(e) => setSearch(e.target.value)}
				className="outline-none appearance-none bg-transparent text-gray-400 placeholder-gray-600"
				placeholder={placeholder}
			/>
		</div>
	);
}
