import { Item } from "../types";

const items: Item[] = require("../data/itemsData.json");

export function tailwindHtml(content: string) {
	content = content
		.replace(/\\n/g, ``)
		.replace(/\<h1\>/g, `<h1 class="text-3xl font-bold mt-8">`)
		.replace(/\<h2\>/g, `<h2 class="text-2xl font-bold mt-8">`)
		.replace(/\<h3\>/g, `<h3 class="text-xl font-bold mt-6">`)
		.replace(/\<h4\>/g, `<h4 class="text-lg font-bold mt-4">`)
		.replace(/\<h5\>/g, `<h5 class="text-lg font-bold mt-2">`)
		.replace(/\<li\>/g, `<li class="list-disc ml-4 space-y-1">`)
		.replace(/\<ul\>/g, `<ul class="list-disc ml-4 space-y-1">`)
		.replace(/\<img/g, `<img class="w-1/2 block mx-auto my-4"`)
		.replace(/\<a/g, `<a target="_blank" class="text-dank-200 break-all"`)
		.replace(/\<table/g, `<table class="w-full text-center text-white"`)
		.replace(
			/\<tr/g,
			`<tr class="table-row align-[inherit] border border-dank-500 even:bg-dank-500 bg-dark-300"`
		)
		.replace(/\<td/g, `<td class="border border-dark-300"`)
		.replace(/\<th/g, `<th class="bg-dank-400"`)
		.replace(/"/g, "'")
		.replace(/\<p\>/g, `<p class="text-dark-400 dark:text-gray-200 mb-3">`);

	Object.values(items).forEach((item) => {
		content = content.replace(
			new RegExp(`item:${item.id}:`, "g"),
			`<img src="${item.image}" class="h-6 inline mr-1 mb-1"/><span class="inline">${item.name}</span>`
		);
	});

	return content;
}
