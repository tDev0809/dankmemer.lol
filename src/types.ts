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
		| "accepted"
		| "developer"
		| "implemented"
		| "duplicate"
		| "denied"
		| "invalid";
	show: boolean;
	title: string;
	upvoted: boolean;
	upvotes: boolean;
}

export interface CommentAuthor {
	discriminator: string;
	id: string;
	username: string;
	developer?: boolean;
	moderator?: boolean;
}

export interface Comment {
	_id: string;
	author: CommentAuthor;
	comment: string;
	createdAt: number;
	replies: any[]; // TODO: define reply
	pID: string;
	deleted?: boolean;
	pinned?: boolean;
}
