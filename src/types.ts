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
	isAdmin: boolean;
	isModerator: boolean;
	locale: string;
	mfa_enabled: boolean;
	premium_type: number;
	public_flags: number;
	token: string;
	username: string;
	verified: boolean;
}

export interface UserData {
	id: string;
	name: string;
	discriminator: string;
	avatar: string;
}

export interface PageProps {
	user?: User;
}

// export interface PostAuthor {
// 	discriminator: string;
// 	id: string;
// 	username: string;
// }

// export interface Post {
// 	_id: string;
// 	author: PostAuthor;
// 	bad: boolean;
// 	category: string;
// 	comments: boolean;
// 	createdAt: number;
// 	description: string;
// 	developerResponse: boolean;
// 	hot: number;
// 	label:
// 		| ""
// 		| "accepted"
// 		| "developer"
// 		| "implemented"
// 		| "duplicate"
// 		| "denied"
// 		| "invalid"
// 		| "considered";
// 	show: boolean;
// 	title: string;
// 	upvoted: boolean;
// 	upvotes: number;
// }

export interface Post {
	_id: string;
	title: string;
	content: string;
	category: typeof POST_CATEGORIES[number];
	createdAt: number;
	label: string;

	author: UserData;
	upvotes: number;
	upvoted: boolean;
	comments: number;
}

export interface Contributor extends UserData {
	score: number;
}

// export interface CommentAuthor {
// 	discriminator: string;
// 	id: string;
// 	username: string;
// 	developer?: boolean;
// 	moderator?: boolean;
// }

// export interface Reply {
// 	_id: string;
// 	cID: string;
// 	pID: string;
// 	author: CommentAuthor;
// 	reply: string;
// 	createdAt: number;
// 	deleted?: boolean;
// }

// export interface Comment {
// 	_id: string;
// 	author: CommentAuthor;
// 	comment: string;
// 	createdAt: number;
// 	replies: Reply[];
// 	pID: string;
// 	deleted?: boolean;
// 	pinned?: boolean;
// }

export interface Blog {
	_id: string;
	author: UserData;
	draft: boolean;
	content: string;
	date: number;
	description: string;
	title: string;
}

export interface Staff {
	_id: string;
	category:
		| "Team"
		| "Bot Moderators"
		| "Support Moderators"
		| "Honorable Mentions";
	name: string;
	about: string;
	social: Record<string, string>;
	avatar: string;
	role?: string;
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

// export interface Profile {
// 	_id: string;
// 	name: string;
// 	discriminator: string;
// 	avatar: string;
// 	developer: boolean;
// 	moderator: boolean;
// 	upvotes: number;
// 	comments: Comment[];
// 	replies: Reply[];
// 	posts: Post[];
// }
