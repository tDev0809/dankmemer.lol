export function tailwindHtml(content: string) {
	return content
		.replaceAll("\\n", ``)
		.replaceAll("<h1>", `<h1 class="text-3xl font-bold mt-8">`)
		.replaceAll("<h2>", `<h2 class="text-2xl font-bold mt-8">`)
		.replaceAll("<h3>", `<h3 class="text-xl font-bold mt-6">`)
		.replaceAll("<h4>", `<h4 class="text-lg font-bold mt-4">`)
		.replaceAll("<h5>", `<h5 class="text-lg font-bold mt-2">`)
		.replaceAll("<li>", `<li class="list-disc ml-4 space-y-1">`)
		.replaceAll("<ul>", `<ul class="list-disc ml-4 space-y-1">`)
		.replaceAll("<img", `<img class="w-1/2 block mx-auto my-4"`)
		.replaceAll("<a", `<a target="_blank" class="text-dank-200"`)
		.replaceAll("<table", `<table class="w-full text-center text-white"`)
		.replaceAll(
			"<tr",
			`<tr class="table-row align-[inherit] border border-dank-500 even:bg-dank-500 bg-dark-300"`
		)
		.replaceAll("<td", `<td class="border border-dark-300"`)
		.replaceAll("<th", `<th class="bg-dank-400"`)
		.replaceAll('\\"', "'")
		.replaceAll("<p>", `<p class="text-dark-400 dark:text-gray-200">`);
}
