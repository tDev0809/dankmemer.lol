import { useRouter } from "next/router";
import Button from "../components/ui/Button";
import { PageProps } from "../types";

export default function Error({}: PageProps) {
	const router = useRouter();

	return (
		<div className="w-full h-screen flex justify-center items-center text-center">
			<div className="flex flex-col space-y-2">
				<div className="text-dank-300 text-6xl font-bold font-montserrat">
					Uh Oh
				</div>
				<div className="font-montserrat font-bold text-dark-400 dark:text-white">
					We can't seem to find the page that you were looking for.
				</div>
				<Button
					size="medium"
					variant="primary"
					onClick={() => router.push("/")}
				>
					Go Home
				</Button>
			</div>
		</div>
	);
}
