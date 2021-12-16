import Link from "next/link";

export function ViewMore() {
	return (
		<Link href="/community/blogs">
			<div className="flex items-center justify-center border-4 border-dark-100 rounded-md h-full w-full cursor-pointer">
				<div className="text-light-600 font-bold">
					<div>
						View more
						<br />
						blog posts
					</div>
					<div className="text-center">
						<span className="material-icons">
							keyboard_arrow_right
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
}
