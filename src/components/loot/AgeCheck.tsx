import { useState } from "react";
import Button from "../ui/Button";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
	checkAge: () => void;
}

export function AgeCheck({ checkAge }: Props) {
	const [date, setDate] = useState("");
	const router = useRouter();

	const verifyAge = () => {
		if (
			parseFloat(
				(
					Math.round(
						(new Date().getTime() - new Date(date).getTime()) /
							1000 /
							(60 * 60 * 24)
					) / 365.25
				).toFixed()
			) >= 21
		) {
			return checkAge();
		} else {
			router.push("/");
		}
	};

	return (
		<div className="mb-40 flex flex-col space-y-2 items-center text-center text-dark-400 dark:text-white">
			<div className="bg-light-500 dark:bg-dark-400 rounded-md p-20">
				<div className="text-5xl font-bold">Hold on!</div>
				<div className="flex flex-col items-center space-y-4">
					<div>
						Before you go any further, we need to verify you are of
						legal age to access the following page.
					</div>
					<div>
						<textarea
							className="w-48 bg-gray-100 dark:bg-dank-500 px-2 py-1 outline-none text-black dark:text-light-300 text-sm h-7 overflow-hidden rounded-md placeholder-gray-500 resize-none"
							maxLength={10}
							onChange={(e) => setDate(e.target.value)}
							value={date}
							placeholder={"YYYY-MM-DD"}
						/>
					</div>
					<div className="flex space-x-2 items-center">
						<Button
							size="medium"
							className="text-white bg-dank-300 hover:bg-opacity-75"
							disabled={date.length !== 10}
							onClick={() => verifyAge()}
						>
							Verify
						</Button>
						<Link href="/">
							<a className="text-dank-300">Go Home</a>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
