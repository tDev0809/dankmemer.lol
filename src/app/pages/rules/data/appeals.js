const serverRules = [
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
    "Unsure"
];

const botRules = [
    "Userbots, spamming or macros",
    "Sharing exploits",
    "Coin storage accounts/Farming accounts/Alts",
    "Racism, homophobia, sexism or slurs",
    "Advertising",
    "Real Money Trading",
    "Discord TOS and Guidelines",
    "Unsure"
];

export default {
    'support': serverRules,
    'community': serverRules,
    'permanent': botRules,
    'temporary': botRules
};