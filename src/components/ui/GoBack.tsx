import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {}

export default function GoBack({}: Props) {
	const router = useRouter();
	const [history, setHistory] = useState(true);

	useEffect(() => {
		if (window.history.length == 1) {
			setHistory(false);
		}
	}, []);

	return (
		<div
			className="flex space-x-2 cursor-pointer text-sm items-center text-dark-300 dark:text-light-100"
			onClick={() =>
				history
					? router.back()
					: router.replace(`/${router.asPath.split("/")[1]}`)
			}
		>
			<span className="material-icons">arrow_back</span>
			<div>Go Back</div>
		</div>
	);
}
