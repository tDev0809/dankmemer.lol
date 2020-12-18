const serverRules = [
    "Follow Discord's Terms of Service",
    "Follow Dank Memer's rules",
    "No pinging or DMing the Developers",
    "No causing drama or questioning mod decisions",
    "Using channels incorrectly",
    "Copypasta posting",
    "Movie/game spoilers of any kind",
    "Begging for attention or for coins",
    "Speaking things other than English",
    "Unsure",
    "I didn't break any rules",
];

const botRules = [
    "Userbots, spamming or macros",
    "Sharing exploits",
    "Coin storage accounts/Farming accounts/Alts",
    "Racism, homophobia, sexism or slurs",
    "Advertising",
    "Scams, sales, trading",
    "Discord TOS and Guidelines",
    "Unsure",
    "I didn't break any rules"
];

export default {
    'server': serverRules,
    'temporary': botRules,
    'permanent': botRules
};