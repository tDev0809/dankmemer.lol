export const QUICK_INFO = [
	{
		title: "Money, Money, Money",
		description:
			"Experience one of the most unique economies found in any Discord bot.",
		icon: "attach_money",
	},
	{
		title: "More Than I Can Count",
		description:
			"Even if you don't have friends, there are millions of other users waiting to rob you!",
		icon: "groups",
	},
	{
		title: "Even Some Funny Jokes",
		description:
			"100+ meme-related commands, you can have a good laugh without the need of scrolling through Reddit.",
		icon: "emoji_emotions",
	},
	{
		title: "Just Right, For You",
		description:
			"You are able to change specific elements of the bot off or on, personally or for your server.",
		icon: "settings",
	},
];

export const FAQ: Record<string, { q: string; a: string }[]> = {
	"Dank Memer": [
		{
			q: "How do I disable commands?",
			a: "To disable commands you need to do pls disable <command> and make sure that there’s no overrides in the enable list so that this stays working. If you do pls enable list and you see an “enabled guild wide” (guild means server by the way) or the command is enabled for a certain channel that means it’s an override, because enables override disables. You can do pls enable remove 4 for example and it will remove number 4 off of the enable list. You can also do pls enable clear and everything on the enable list will be reset. (The same goes for the disable list if you’re looking to clear it or remove something off the list for that)",
		},
		{
			q: "Why is the bot offline?",
			a: "More than likely, we are rebooting for an update or performance fixes. If the bot is ever offline more than 30 minutes, check in at our support server to see if there's major downtime planned.",
		},
		{
			q: "How do I disable a command for everyone except a certain role or user?",
			a: "You can do this by pls disable <command> then doing pls enable <command> <role> or pls enable <command> <@user>",
		},
		{
			q: "Why won’t the bot respond to me on my server?",
			a: "Please make sure the prefix has not changed, and the bot is showing online in your member list. If neither of these things are the case, please contact a support specialist for further help.",
		},
		{
			q: "How do I see multiple shop pages?",
			a: "To go to the next page or a certain page, do pls shop 2 for example, just add the number of the page you want to see to the end of the command. This applies to all commands or things that have multiple pages such as your inventory, notifications, the work list, etc.",
		},
		{
			q: "How do I enable/disable dm notifications?",
			a: "You can enable your dm notifications by simply doing pls settings dm notifications enabled and pls settings dm notifications nah to turn them off.",
		},
		{
			q: "Why did I get a notification twice?",
			a: "Sometimes you get a notification twice, the reason for that happening is due to a bug. If it’s a level up notification and you get the rewards twice, don’t worry about it, you won’t get any penalty or anything. This problem will be fixed once the rewrite of the bot is completed. (This also applies to quest rewards)",
		},
		{
			q: "How do I get a job that’s locked?",
			a: "If there’s certain jobs that have a red square or are locked in pls work list this means that you need to work more to unlock them. You can do pls work view (job) and it’ll tell you how many hours are required for whichever job you put. Then you can check how many hours you have by pls work info and figure out how much more you need to unlock it.",
		},
		{
			q: "How do I increase my bank?",
			a: "To increase your bank you need to use currency commands or bank notes (you can get these by pls fish, pls beg, quests, loot boxes, trading for them, etc.). You can view all the different currency commands by pls cmds currency, for every few you use you’ll gain an experience point or two which you can check on by doing pls profile. As you gain xp, you gain bankspace.",
		},
		{
			q: "Why are my coins missing?",
			a: "There are many ways that coins can be lost. Whenever you lose some, you should always do pls notifs to check what happened. This will let you know if you died, got robbed, got heisted, etc. Some of the ways to lose coins are dying, robbing someone and getting fined, a heist (dying or getting fined), calling the police to stop one when there isn’t one going on, auto-lottery, or ending a game of blackjack.",
		},
		{
			q: "How did I die?",
			a: "Running pls notifs will show you your cause of death in the bot. You can die by your pet attacking you for not taking care of them enough, from pls search, a landmine, using a tide pod or alcohol, using pls hunt, robbing someone and their pet attacks you, or participating in a heist.",
		},
		{
			q: "Where did my item go?",
			a: "Do pls notifs and check if you died, if yes, then do pls notifs view #(notification number) to view the whole notification and see if you also lost an item. If no, then you most likely traded it to someone, gifted it, or sold it (if it was sellable) | Note: Any item can be lost when you die without using an apple or not having a lifesaver in your inventory",
		},
		{
			q: "What can I do with my cookies or other collectables?",
			a: "As the name or type of the item suggests they are meant to be collected or to be traded to other users.",
		},
		{
			q: "Why would I want to prestige?",
			a: "When prestiging you will lose all your coins and all your items in exchange for a small multiplier for each time you prestige (continues to increase until prestige 10). You also gain bank space at an increased rate every time you prestige. You will obtain a prestige badge (see image below) that appears on your profile and changes each time you prestige up to prestige 10. Additionally, you will receive some starter items each time you prestige. What are these items? You’ll have to prestige and find out for yourself.",
		},
		{
			q: "How do I turn on/off passive mode?",
			a: "You can turn on passive mode by doing pls settings passive true OR pls settings passive false to turn it off.\n- When turning on this setting, no one will be able to rob or heist you.\n- You cannot interact with other users (share, gift, etc.).\n- Item buffs for stealing cannot be used, nor can you steal as well.\n- You also lose 25% and 30% of winnings in bets and slots, respectively. (it doesn’t affect blackjack)\n- Keep in mind that your passive will be turned off automatically if you don’t run commands for more than 14 days.",
		},
	],
	"Beta Bot": [
		{
			q: "What is Dank Memer Beta?",
			a: 'Dank Memer Beta is the "beta" version of the main bot. It\'s considered unstable, but has more updated features than the main bot.',
		},
		{
			q: "Where did my beta coins go?",
			a: "Because of it being a BETA, we sometimes wipe the currency. Please use the main bot to avoid this.",
		},
		{
			q: "Why is x changed? Is this a bug?",
			a: "Maybe, maybe not. Some things are changed, some things are bugs, idk. It's a beta, stop asking questions.",
		},
	],
	Website: [
		{
			q: "Why won’t my appeal or report send after pressing the send button?",
			a: "You need to be logged in to send appeals or bot reports so that bot mods know who sent it and can read over it and then take any action if needed. Another thing that could be your issue is that you need to have at least 20 words for it to send, make sure you’ve followed both of these things.",
		},
		{
			q: "When will I get a response for my appeal?",
			a: "We do not give out any time frames or ETAs on appeals, your patience on this matter is heavily appreciated. Additionally, you will not get a response if you have been denied.",
		},
		{
			q: "How do I put proof in my report?",
			a: "To put proof in your report go to imgur and upload the image there and then copy the link to paste in your report. You can also send the image somewhere on discord, then click on the image, then either copy the link or press share and then copy the link to put it in your report.",
		},
	],
	Premium: [
		{
			q: "How do I receive my perks?",
			a: "After the payment has gone through for donating on patreon, you can claim your perks by connecting your Discord account to your Patreon account and then doing pls link in a discord server and waiting for the bot to link your perks. Once they’ve been linked successfully you can do pls redeem to claim your loot boxes (currently the cooldown on this command is 3 days) and pls pserver add in a server (if you have the tier to) and that’ll add premium perks to that server. Meaning it’ll get things like weekly, auto-meme, auto-nsfw. The members of the server will have donor cooldowns, the ability to use nsfw commands, and the previous perks if the patreon tier is $10+.",
		},
		{
			q: "How do I remove a server as premium?",
			a: "Sometimes you leave a server that you added as premium, it gets deleted, or you just don’t want it as premium anymore. You can remove the server as premium by doing pls pserver list, then copying the ID of whichever server and doing pls pserver remove ID. You can then add a different server as premium by pls pserver add in that server.",
		},
		{
			q: "I added premium perks to the server but it says it isn’t premium?",
			a: "Then the premium perks added is from a 5$ tier, only from 10$ tier and above can give premium perks to the server where everyone can have donor perks and for the server to be called a Premium Server.",
		},
		{
			q: "How do I check if a server is premium and where do I find them?",
			a: "Do pls multi and if there’s a multiplier “Premium Server” then it is a premium server. For premium servers, check our partnered servers, join our community server, or search for premium servers in Google.",
		},
		{
			q: "How often do I have to pay for premium?",
			a: "Due to how Patreon works, you will be charged up front when you first subscribe, and then again on the 1st of each month after that. Yes, that does still apply even if you start your sub on the 30th, you will be charged again on the 1st.",
		},
		{
			q: "I don't like my patreon perks, can I have a refund",
			a: "We do not offer any refunds for patreon perks. Please refer to our refund policy on this site.",
		},
		{
			q: "What do Steal Shields do?",
			a: "Steal shields make it so that if you are robbed you will lose less coins, the higher this is, the less you get robbed from you. For example, if you have a 20% Shield you will lose 20% less, so if you were going to get robbed of 1 million coins, you would only get 800k stolen from you instead. By the way, donor steal shields don’t stack, meaning the percentage for your tier won’t add on to a previous one, ex: $2 donor gets 5% and you’re a $5 donor, you will only get 20% steal shield because it doesn’t add.",
		},
	],
	Lootboxes: [
		{
			q: "How long does it take to get my boxes?",
			a: "We are at the mercy of PayPal webhooks. Sometimes it's instant, and sometimes it can take up to two days. If it takes longer than two days, please contact our support with your transaction number.",
		},
		{
			q: "Can I use my mom's card?",
			a: "You may only use a payment method you are authorized to use. Using a card you aren't authorized for is fraud, and you will NOT get a refund + you will be banned from our bot.",
		},
		{
			q: "Can I have a refund for my loot boxes?",
			a: "Due to it being a digital item, and due to us losing money if we give a refund, we offer no refunds. Please see our refund policy on this site.",
		},
	],
};

export const FEEDBACK_LABELS = [
	"all posts",
	"accepted",
	"implemented",
	"duplicate",
	"denied",
	"invalid",
	"considered",
];

export const FEEDBACK_CATEGORIES = [
	"currency_items",
	"currency_commands",
	"currency_balances",
	"new_features",
	"qol_changes",
	"patreon_and_lootboxes",
	"pipe_dream",
	"other",
];

export const FEEDBACK_CATEGORIES_DESCRIPTIONS: Record<string, string> = {
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

export const REPORTS: Record<string, string[]> = {
	user: [
		"Userbot, Autotyper, Macro",
		"Spamming",
		"Sharing exploits",
		"Abusing exploits",
		"Racism or other form of targeted hate",
		"Causing drama/Witch hunting",
		"Using the bot for advertising",
		"Real Money Trading",
		"Discord TOS",
		"Other",
	],
	server: [
		"Server has userbots",
		"Rule breaking Giveaway Requirements or Bot Usage Requirements",
		"Server is trading invites/nitro for currency",
		"Server is knowingly breaking bot rules",
		"Server has alts",
		"Server is witch-hunting or causing drama around Dank Memer",
		"Other",
	],
};

export const APPEALS: Record<string, string[]> = {
	user: [
		"Discord's Terms of Service",
		"Dank Memer’s rules",
		"Pinging or DMing the Developers",
		"Causing drama or questioning mod decisions",
		"Using channels incorrectly",
		"Mini-modding",
		"Copypasta",
		"Spam",
		"Spoilers",
		"Scamming",
		"Unsure",
	],
	server: [
		"Userbots, spamming or macros",
		"Sharing exploits",
		"Coin storage accounts/Farming accounts/Alts",
		"Racism, homophobia, sexism or slurs",
		"Advertising",
		"Real Money Trading",
		"Discord TOS and Guidelines",
		"Unsure",
	],
};

export const LOOT_BLOCKED_COUNTRIES = ["BE"];
export const LOOT_AGE_VERIFICATION = ["ES", "NL"];

export const LOOT_MINIMUM_PURCHASE_VALUE = 3;
export const LOOT_MINIMUM_DISCOUNT_VALUE = 20;
export const LOOT_FLAT_DISCOUNT_PERCENTAGE = 10;
