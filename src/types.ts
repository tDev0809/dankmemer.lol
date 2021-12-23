import { POST_CATEGORIES } from "./constants";

export interface User {
	accent_color: string;
	avatar: string;
	banner: string;
	banner_color: string;
	discriminator: string;
	email: string;
	flags: number;
	id: string;
	locale: string;
	mfa_enabled: boolean;
	premium_type: number;
	public_flags: number;
	token: string;
	username: string;
	verified: boolean;
	developer: boolean;
	moderator: boolean;
	botModerator: boolean;
	honorable: boolean;
	modManager: boolean;
}

export interface UserData {
	id: string;
	name: string;
	discriminator: string;
	avatar: string;
	developer: boolean;
	moderator: boolean;
	botModerator: boolean;
	honorable: boolean;
	modManager: boolean;

	_id?: string;
	banner?: string;
	vanity?: string;
	socials?: Record<string, string>;
	about?: string;
}

export interface PageProps {
	user?: User;
}

export interface Post {
	_id: string;
	title: string;
	content: string;
	category: typeof POST_CATEGORIES[number];
	createdAt: number;

	labels: string[];
	author: UserData | string;
	upvotes: number;
	upvoted: boolean;
	comments: number;
}

export interface Contributor extends UserData {
	score: number;
}

export interface Reply {
	_id: string;
	cID: string;
	pID: string;
	author: UserData | string;
	content: string;
	createdAt: number;
}

export interface Comment {
	_id: string;
	author: UserData | string;
	content: string;
	createdAt: number;
	replies: Reply[];
	pID: string;
	pinned?: boolean;
}

export interface Blog {
	_id: string;
	author: UserData | string;
	draft: boolean;
	content: string;
	date: number;
	description: string;
	title: string;
}

export interface Item {
	id: string;
	type: string;
	name: string;
	image: string;
	cost: number;
	rarity: number;
	showInShop: boolean;
	items?: Item["id"][];
	reward?: {
		items: Item["id"][];
	};
	longdescription?: string;
	description: string;
	effects?: string;
	notSharable?: boolean;
	components?: Record<Item["id"], number>;
}

export interface Box {
	id: number;
	name: string;
	description: string;
	yield: string;
	randomItem: {
		keyword: string;
		change: number;
	};
	price: number;
	items: {
		name: string;
		amount: string;
	}[];
}

export interface Announcement {
	_id: number;
	content: string;
	createdAt: number;
}

export interface AdOptions {
	mediaQuery?: string;
	renderVisibleOnly: boolean;
	sizes: [number, number][];
}

export interface Profile {
	user: UserData;
	posts: Post[];
	comments: number;
	upvotes: number;
	activities: Activity[];
}

export interface Activity {
	type: number;
	data: Record<string, any>;
	createdAt: number;
}

export interface Banner {
	title: string;
	description: string;
	image: string;
	url: string;
	buttonText: string;
}
