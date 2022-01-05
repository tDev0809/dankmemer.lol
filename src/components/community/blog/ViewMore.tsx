import Link from "next/link";
import { Icon } from "../../Icon";

export function ViewMore() {
	return (
		<Link href="/community/blogs">
			<div className="flex items-center justify-center border-4 border-light-500 dark:border-dark-100 rounded-md h-full w-full cursor-pointer">
				<div className="text-light-600 font-bold p-2">
					<div>
						View more
						<br />
						blog posts
					</div>
					<div className="text-center">
						<Icon id="keyboard_arrow_right" />
					</div>
				</div>
			</div>
		</Link>
	);
}
