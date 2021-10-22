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

export interface PageProps {
	user?: User;
}

export interface PostAuthor {
	discriminator: string;
	id: string;
	username: string;
}

export interface Post {
	_id: string;
	author: PostAuthor;
	bad: boolean;
	category: string;
	comments: boolean;
	createdAt: number;
	description: string;
	developerResponse: boolean;
	hot: number;
	label:
		| ""
		| "accepted"
		| "developer"
		| "implemented"
		| "duplicate"
		| "denied"
		| "invalid"
		| "considered";
	show: boolean;
	title: string;
	upvoted: boolean;
	upvotes: number;
}

export interface CommentAuthor {
	discriminator: string;
	id: string;
	username: string;
	developer?: boolean;
	moderator?: boolean;
}

export interface Reply {
	_id: string;
	cID: string;
	author: CommentAuthor;
	reply: string;
	createdAt: number;
	deleted?: boolean;
}

export interface Comment {
	_id: string;
	author: CommentAuthor;
	comment: string;
	createdAt: number;
	replies: Reply[];
	pID: string;
	deleted?: boolean;
	pinned?: boolean;
}

export interface Blog {
	_id: string;
	author: string;
	content: string;
	date: number;
	desc: string;
	name: string;
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
	showInShop: boolean;
	items?: Item["id"][];
	reward?: {
		items: Item["id"][];
	};
	longdescription?: string;
	description: string;
	effects?: string;
}
