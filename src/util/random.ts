export function randomInArray<T>(array: T[]): T {
	return array[Math.floor(Math.random() * array.length)];
}

export function randomAvatar(id = "0") {
	return `https://cdn.discordapp.com/embed/avatars/${parseFloat(id) % 5}.png`;
}
