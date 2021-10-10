export function sanitizeCategory(category: string) {
	category = category.replace("_", " ");
	return category[0].toUpperCase() + category.substr(1).toLowerCase();
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
