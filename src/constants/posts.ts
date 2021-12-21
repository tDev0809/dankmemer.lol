export const POST_LABELS = [
	"all",
	"accepted",
	"implemented",
	"duplicate",
	"denied",
	"invalid",
	"considered",
];

export const POST_CATEGORIES = [
	"currency_items",
	"currency_commands",
	"currency_balances",
	"new_features",
	"qol_changes",
	"patreon_and_lootboxes",
	"pipe_dream",
	"other",
] as const;

export const POST_CATEGORIES_DESCRIPTIONS: Record<string, string> = {
	currency_items:
		"Ideas or feedback pertaining to items in Dank Memer's currency",
	currency_commands:
		"Ideas or feedback pertaining to commands in Dank Memer's currency system",
	currency_balances: "Ideas or feedback to balancing Dank Memer's economy",
	new_features:
		"Ideas for new features to be added in the bot, can be related to any category",
	qol_changes: "Ideas and feedback for quality of life changes on dank memer",
	patreon_and_lootboxes:
		"Ideas and feedback for any of our premium offerings such as patreon and lootboxes",
	pipe_dream:
		"Ideas that you don't think will ever be added, but would be neat to think about none the less",
	other: "Any ideas or feedback that don't fit into other categories",
};
