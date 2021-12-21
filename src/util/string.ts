export function truncate(source: string, size: number) {
	return source.length > size ? source.slice(0, size - 1) + "…" : source;
}

export function toTitleCase(text: string) {
	return text
		.split(" ")
		.map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
		.join(" ");
}
