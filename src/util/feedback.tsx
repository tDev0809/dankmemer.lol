export function sanitizeCategory(category: string) {
	const map = {
		Qol: "QoL",
	};

	category = category.replace("_", " ");

	let out = category[0].toUpperCase() + category.substr(1).toLowerCase();

	Object.entries(map).forEach(([o, n]) => {
		out = out.replace(o, n);
	});

	return out;
}

export function urlify(text: string) {
	const urlRegex = /(https?:\/\/[^\s]+)/g;
	return text.split(urlRegex).map((part) =>
		part.match(urlRegex) ? (
			<a
				target="_blank"
				className="text-dank-300 dark:text-dank-100"
				href={part}
			>
				{part}
			</a>
		) : (
			part
		)
	);
}
