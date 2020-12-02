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
    "USERBOTS, SPAMMING, AND MACROS",
    "SHARING EXPLOITS",
    "COIN STORAGE ACCOUNTS/FARMING ACCOUNTS/ALTS",
    "RACISM, HOMOPHOBIA, SEXISM, SLURS",
    "ADVERTISING",
    "SCAMS, SALES, TRADING",
    "DISCORD TOS AND GUIDELINES",
    "Unsure",
    "I didn't break any rules"
];

export default {
    'Server Ban': serverRules,
    'Server Mute': serverRules,
    'Bot Ban': botRules,
    'Bot Blacklist': botRules
};