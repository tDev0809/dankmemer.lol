(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./src/app/Pages/Commands/CmdTable/CmdTable.scss":
/*!*******************************************************!*\
  !*** ./src/app/Pages/Commands/CmdTable/CmdTable.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/Pages/Commands/CmdTable/CmdTable.scss?");

/***/ }),

/***/ "./src/app/Pages/Commands/CmdTable/index.jsx":
/*!***************************************************!*\
  !*** ./src/app/Pages/Commands/CmdTable/index.jsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _CmdTable_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CmdTable.scss */ \"./src/app/Pages/Commands/CmdTable/CmdTable.scss\");\n/* harmony import */ var _CmdTable_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_CmdTable_scss__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(({data,category})=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"command-block\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\",{className:\"category-name\"},category),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"table\",{className:\"command-table\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"tbody\",null,data.map(command=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"tr\",{className:\"command-tr\",key:command.triggers[0]},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"td\",{className:\"blurple\"},command.triggers[0]),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"td\",null,command.description))))))));\n\n//# sourceURL=webpack:///./src/app/Pages/Commands/CmdTable/index.jsx?");

/***/ }),

/***/ "./src/app/Pages/Commands/Commands.scss":
/*!**********************************************!*\
  !*** ./src/app/Pages/Commands/Commands.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/Pages/Commands/Commands.scss?");

/***/ }),

/***/ "./src/app/Pages/Commands/commands.json":
/*!**********************************************!*\
  !*** ./src/app/Pages/Commands/commands.json ***!
  \**********************************************/
/*! exports provided: 🐶 Animals, ⚙ Config, 💰 Currency, 😄 Fun, 🎲 Games, 📷 Image, 😂 Memey, 🔨 Moderation, 😏 NSFW, 🔊 Sound, 🆗 Text, 🛠 Utility, default */
/***/ (function(module) {

eval("module.exports = {\"🐶 Animals\":[{\"triggers\":[\"animals\"],\"description\":\"See a multiude of animals from various subreddits\"},{\"triggers\":[\"aww\",\"cute\",\"adorable\"],\"description\":\"See some random cute things\"},{\"triggers\":[\"ducc\",\"quacker\",\"quack\",\"duck\",\"kwek\",\"eend\"],\"description\":\"Quack quack!\"},{\"triggers\":[\"ferret\",\"ferros\"],\"description\":\"Ferrets are cute I guess, not as cute as otters though\"},{\"triggers\":[\"foxxy\",\"fox\"],\"description\":\"See some foxes!\"},{\"triggers\":[\"hootyboi\",\"hoot\",\"superbowl\",\"football\",\"owl\"],\"description\":\"a command to see owls?\"},{\"triggers\":[\"hoppyboi\",\"rabbit\",\"bunny\"],\"description\":\"See some cute bunnies!\"},{\"triggers\":[\"kitty\",\"pussy\",\"cat\",\"meow\"],\"description\":\"Lets see some pretty kitties!\"},{\"triggers\":[\"lizzyboi\",\"lizard\",\"scales\"],\"description\":\"See some cute lizzybois!\"},{\"triggers\":[\"otter\",\"otters\"],\"description\":\"Otters won the vote, so you KNOW they're cute\"},{\"triggers\":[\"pupper\",\"doggo\",\"dog\",\"yipper\",\"puppy\",\"borkyboi\"],\"description\":\"See some cute doggos!\"},{\"triggers\":[\"redpanda\",\"redboi\"],\"description\":\"See some cute red pandas!\"},{\"triggers\":[\"snek\",\"snake\"],\"description\":\"See some danger noodles, nope ropes, and sneks\"}],\"⚙ Config\":[{\"triggers\":[\"automeme\"],\"description\":\"Set up a channel to automatically post memes to every 5 minutes. To disable it, just run `pls automeme` again\"},{\"triggers\":[\"autonsfw\"],\"description\":\"Set up a webhook to automatically post porn to a channel, you nasties\"},{\"triggers\":[\"autoresponse\",\"ar\"],\"description\":\"Decide whether to enable or disable certain autoresponses on this server\"},{\"triggers\":[\"disable\"],\"description\":\"Use this command to disable commands or categories you do not wish for your server to use\"},{\"triggers\":[\"enable\"],\"description\":\"Use this command to enable disabled commands or categories.\"},{\"triggers\":[\"modlog\"],\"description\":\"Mention a channel to set/update/remove a modlog channel\"},{\"triggers\":[\"noswears\",\"noswear\",\"swearfilter\",\"toggleswear\"],\"description\":\"NO SWEARS IN THIS CHRISTIAN SERVER\"},{\"triggers\":[\"prefix\"],\"description\":\"Change Dank Memer's prefix!\"},{\"triggers\":[\"premiumserver\",\"pserver\",\"premium\",\"donorserver\"],\"description\":\"Add or remove the current guild as a premium server, or leave the arguments blank to list all of your premium servers.\\n\\nYou can remove a premium guild by its ID by specifying the ID after `remove`, like `pls premiumserver remove [id]`, you can get the ID by listing your redeemed premium servers\"},{\"triggers\":[\"serverconf\",\"conf\"],\"description\":\"Show your server's custom dank memer configuration\"},{\"triggers\":[\"settings\",\"usersettings\",\"usettings\",\"config\"],\"description\":\"Adjust user-specific settings and cool stuff\"},{\"triggers\":[\"subscribe\"],\"description\":\"Set/update/remove an updates channel (you will get dank memer update notes and offline notices), to disable it, just run `{command}`\"}],\"💰 Currency\":[{\"triggers\":[\"balance\",\"bal\",\"coins\"],\"description\":\"Check your coin balance, or someone elses\"},{\"triggers\":[\"bank\"],\"description\":\"Check your account balance\"},{\"triggers\":[\"bankrob\",\"heist\"],\"description\":\"Rob somebody's bank!\"},{\"triggers\":[\"beg\"],\"description\":\"haha ur poor so you have to beg for coins lmaoooo\"},{\"triggers\":[\"buy\",\"purchase\"],\"description\":\"Buy something from the shop\"},{\"triggers\":[\"daily\",\"24hr\"],\"description\":\"Get your daily injection of meme coins\"},{\"triggers\":[\"deposit\",\"dep\"],\"description\":\"Deposit money into the bank\"},{\"triggers\":[\"flip\",\"coinflip\"],\"description\":\"Flip a coin, and if you call it you win it!\"},{\"triggers\":[\"gamble\",\"bet\"],\"description\":\"Take your chances at gambling. Warning, I am very good at stealing your money.\"},{\"triggers\":[\"guide\",\"currencyhelp\"],\"description\":\"See a basic guide on how to use dank memer currency\"},{\"triggers\":[\"inventory\",\"inv\"],\"description\":\"Check out your inventory/items or see another users\"},{\"triggers\":[\"lootbox\",\"lootboxes\"],\"description\":\"see how to use this CLEARLY P2W BOT!!!\"},{\"triggers\":[\"lottery\"],\"description\":\"Buy a lottery ticket, a winner every hour, winner takes all that hour's entry fees!\"},{\"triggers\":[\"multiplier\",\"multi\"],\"description\":\"Check your multiplier amount\"},{\"triggers\":[\"pet\"],\"description\":\"Interact with your pet if you own one!\"},{\"triggers\":[\"postmemes\",\"postmeme\"],\"description\":\"Use a laptop to post memes and try and get some sweet sweet revenue from it\"},{\"triggers\":[\"prestige\",\"pres\",\"startover\"],\"description\":\"Give up all of your goods to earn ultimate memer status\"},{\"triggers\":[\"profile\",\"level\"],\"description\":\"Check out your profile or see another users\"},{\"triggers\":[\"quests\",\"quest\"],\"description\":\"See currency quests\"},{\"triggers\":[\"redeem\"],\"description\":\"redeem your cool donor rewards fortnightly!!\"},{\"triggers\":[\"remove\",\"removeitem\",\"ri\",\"unequip\"],\"description\":\"Unequip or remove an active item. Note that you will not receive the item back after removing it.\"},{\"triggers\":[\"rich\",\"richest\",\"toponepercent\"],\"description\":\"see who the top 10 richest users are in your server, or globally!\"},{\"triggers\":[\"search\",\"scout\"],\"description\":\"haha ur poor so you have to search around for coins, btw this can totally kill you\"},{\"triggers\":[\"sell\"],\"description\":\"Sell one of your items\"},{\"triggers\":[\"share\",\"give\"],\"description\":\"share some coins with someone\"},{\"triggers\":[\"shop\",\"store\"],\"description\":\"See what's in store\"},{\"triggers\":[\"slots\",\"slotmachine\"],\"description\":\"Take your chances at a slot machine. Warning, I am very good at stealing your money.\"},{\"triggers\":[\"steal\",\"rob\",\"ripoff\"],\"description\":\"Take your chances at stealing from users. Warning, you will lose money if you get caught!\"},{\"triggers\":[\"use\",\"consume\"],\"description\":\"Use a super cool consumable item\"},{\"triggers\":[\"weekly\"],\"description\":\"Get your weekly injection of meme coins\"},{\"triggers\":[\"withdraw\",\"with\"],\"description\":\"Withdraws money from the bank\"},{\"triggers\":[\"work\",\"job\"],\"description\":\"get to work buddy\"}],\"😄 Fun\":[{\"triggers\":[\"8ball\",\"fortune\"],\"description\":\"Ask the magic (and kinda rude) 8ball about your future!\"},{\"triggers\":[\"asktrump\",\"askdonald\",\"whatdoestrumpthinkabout\"],\"description\":\"Ask the president whatever you'd like!\"},{\"triggers\":[\"baguette\"],\"description\":\"🥖\"},{\"triggers\":[\"croissant\"],\"description\":\"🥐\"},{\"triggers\":[\"dankrate\",\"memerate\"],\"description\":\"See how dank you are, 100% official dank score\"},{\"triggers\":[\"deletethis\"],\"description\":\"\\\"deletethis\\\" memes\"},{\"triggers\":[\"foodporn\"],\"description\":\"See some food that makes your mouth water\"},{\"triggers\":[\"gif\",\"giphy\"],\"description\":\"Get some sicc gifs to show how you feel\"},{\"triggers\":[\"google\",\"lmgtfy\"],\"description\":\"Sick of someone asking dumb questions? LMGTFY it for them!\"},{\"triggers\":[\"hack\"],\"description\":\"Hack your friends! Or your enemies...\"},{\"triggers\":[\"howgay\",\"gayrate\"],\"description\":\"See how gay you are (100% real)\"},{\"triggers\":[\"kill\",\"murder\",\"takecareof\"],\"description\":\"Sick of someone? Easy! Just kill them! (we do not endorse murder yet)\"},{\"triggers\":[\"mock\"],\"description\":\"Mock the stupid shit your friend says!\"},{\"triggers\":[\"penis\",\"howbig\",\"peepee\",\"pickle\"],\"description\":\"how big peepee\"},{\"triggers\":[\"rankthot\",\"thotrate\"],\"description\":\"See how thot you are (can be used in an official capacity)\"},{\"triggers\":[\"waifu\"],\"description\":\"See how good of a waifu you are\"},{\"triggers\":[\"roast\",\"rekt\"],\"description\":\"Sick of someone? Easy! Just roast them!\"},{\"triggers\":[\"showerthoughts\"],\"description\":\"Things to thing about in the shower\"},{\"triggers\":[\"uselessweb\",\"randomsite\"],\"description\":\"See a random site from https://theuselessweb.com/\"}],\"🎲 Games\":[{\"triggers\":[\"fight\",\"challenge\"],\"description\":\"Fight to the death!\"},{\"triggers\":[\"gamelb\",\"glb\",\"gameleaderboard\",\"topgame\",\"topgamer\"],\"description\":\"See the top 10 gamers in your guild or globally 😎\\nYou can provide the name of any of the games in the `Games` category to see leaderboard information on that specific game. Defaults to `trivia`.\"},{\"triggers\":[\"guess\",\"hol\",\"gtn\"],\"description\":\"guessing game of the year 10/10\"},{\"triggers\":[\"tictactoe\",\"ttt\"],\"description\":\"Play a nice calm game of tic tac toe with your mates\"},{\"triggers\":[\"trivia\",\"triv\"],\"description\":\"Answer some trivia for a chance to win some coins.\"}],\"📷 Image\":[{\"triggers\":[\"abandon\",\"disown\"],\"description\":\"Disowned!\"},{\"triggers\":[\"achievement\",\"minecraft\",\"mc\"],\"description\":\"Am I the only one that didnt know minecraft had achievements\"},{\"triggers\":[\"affect\"],\"description\":\"get affected, REALLY AFFECTED\"},{\"triggers\":[\"airpods\",\"douche\"],\"description\":\"auxim made me add this\"},{\"triggers\":[\"america\",\"murica\"],\"description\":\"AMERICA, F YEAH\"},{\"triggers\":[\"armor\",\"armour\"],\"description\":\"Nothing can get through this armor!\"},{\"triggers\":[\"balloon\"],\"description\":\"You can't pop this balloon\"},{\"triggers\":[\"slap\",\"batslap\",\"batman\"],\"description\":\"Slap someone shitless with this.\"},{\"triggers\":[\"bed\",\"monster\"],\"description\":\"lol rekt\"},{\"triggers\":[\"bongocat\",\"bongo\"],\"description\":\"smack smack...\"},{\"triggers\":[\"boo\"],\"description\":\"AAHHHH\"},{\"triggers\":[\"brain\",\"brains\"],\"description\":\"idk what to put here tbh\"},{\"triggers\":[\"brazzers\"],\"description\":\"Someone have a spicy profile pic? See a hot new picture of Trump online? Add the Brazzers logo with this command to make it spicy hot.\"},{\"triggers\":[\"byemom\",\"bye\"],\"description\":\"Quick, mom is gone, what are you gonna search on google?\"},{\"triggers\":[\"cancer\",\"cancerous\"],\"description\":\"the picture doesn't lie...\"},{\"triggers\":[\"changemymind\"],\"description\":\"well come on change my mind\"},{\"triggers\":[\"communism\",\"commie\"],\"description\":\"COMMUNISM, F YEAH\"},{\"triggers\":[\"corporate\",\"difference\"],\"description\":\"Find the difference, just kidding there is none\"},{\"triggers\":[\"crab\",\"crabrave\"],\"description\":\"Generate a :crab: rave meme\"},{\"triggers\":[\"cry\",\"tears\",\"water\"],\"description\":\"Leik dis if you crye evertim\"},{\"triggers\":[\"dab\"],\"description\":\"Dab on the haters\"},{\"triggers\":[\"dank\",\"2dank4u\",\"3dank5u\"],\"description\":\"dank tbh\"},{\"triggers\":[\"deepfry\"],\"description\":\"😂👌💯🔥\"},{\"triggers\":[\"delete\",\"delet\"],\"description\":\"delet this.\"},{\"triggers\":[\"disability\"],\"description\":\"not all disabilities look like you\"},{\"triggers\":[\"door\",\"kickdoor\"],\"description\":\"lol rekt\"},{\"triggers\":[\"egg\",\"birth\"],\"description\":\"There is no reason for this command, but here you go.\"},{\"triggers\":[\"excuseme\"],\"description\":\"excuse me what the f\"},{\"triggers\":[\"facts\",\"fact\"],\"description\":\"It is just a fact bro\"},{\"triggers\":[\"failure\",\"class\"],\"description\":\"lmfao u suck\"},{\"triggers\":[\"fakenews\",\"fake\"],\"description\":\"CNN!\"},{\"triggers\":[\"fedora\",\"tip\"],\"description\":\"lol rekt\"},{\"triggers\":[\"floor\",\"theflooris\"],\"description\":\"the floor is using commands in the right channel\"},{\"triggers\":[\"gay\",\"gaypride\",\"pride\"],\"description\":\"Show your gay pride!\"},{\"triggers\":[\"hitler\",\"worsethanhitler\"],\"description\":\"It's not offensive if it's true, so use this wisely.\"},{\"triggers\":[\"humansgood\"],\"description\":\"Humans are good\"},{\"triggers\":[\"invert\"],\"description\":\"Your least favorite command is back!\"},{\"triggers\":[\"jail\",\"prison\"],\"description\":\"Send your friends to jail!\"},{\"triggers\":[\"knowyourlocation\",\"kyl\"],\"description\":\"Dank Memer would like to know your location\"},{\"triggers\":[\"laid\",\"getlaid\"],\"description\":\"feel free to post to me_irl\"},{\"triggers\":[\"madethis\"],\"description\":\"I made this\"},{\"triggers\":[\"magik\",\"squiggle\"],\"description\":\"Make something magik!\"},{\"triggers\":[\"master\"],\"description\":\"give the master your sword!\"},{\"triggers\":[\"note\",\"angryman\"],\"description\":\"It is just a note bro\"},{\"triggers\":[\"ohno\",\"retarded\"],\"description\":\"oh no\"},{\"triggers\":[\"plan\",\"gru\"],\"description\":\"idk what to put here tbh\"},{\"triggers\":[\"quote\"],\"description\":\"make people say stuff\"},{\"triggers\":[\"radialblur\",\"radial\"],\"description\":\"Make things blurry and radial I guess?\"},{\"triggers\":[\"rip\"],\"description\":\"rest in pepperonis\"},{\"triggers\":[\"roblox\"],\"description\":\"what a noob\"},{\"triggers\":[\"salty\",\"salt\"],\"description\":\"You seem salty to me, let me show you.\"},{\"triggers\":[\"satan\",\"lucifer\",\"devil\"],\"description\":\"You are satan ok\"},{\"triggers\":[\"savehumanity\",\"humanity\"],\"description\":\"idk what to put here tbh\"},{\"triggers\":[\"screams\"],\"description\":\"WHY\"},{\"triggers\":[\"shit\",\"shitty\"],\"description\":\"The shit on my shoe!\"},{\"triggers\":[\"sickban\",\"sickfilth\"],\"description\":\"ban this nerd pls\"},{\"triggers\":[\"slapsroof\",\"carsalesman\"],\"description\":\"this bad boy can fit so many memes...\"},{\"triggers\":[\"spank\",\"spanking\"],\"description\":\"Spank those naughty users\"},{\"triggers\":[\"surprised\"],\"description\":\"I honestly have no clue what this command does\"},{\"triggers\":[\"thesearch\"],\"description\":\"The Search\"},{\"triggers\":[\"trash\",\"garbage\"],\"description\":\"lol ur trash\"},{\"triggers\":[\"trigger\",\"triggered\"],\"description\":\"UR SO TRIGGERED BRO\"},{\"triggers\":[\"tweet\",\"tweetastrump\"],\"description\":\"dear lord, what is trump saying now...\"},{\"triggers\":[\"ugly\",\"uglier\"],\"description\":\"lol rekt\"},{\"triggers\":[\"unpopular\",\"wrongopinion\"],\"description\":\"your opinion is bad and you should feel bad...\"},{\"triggers\":[\"vr\"],\"description\":\"Get that sweet sweet realistic vr image\"},{\"triggers\":[\"walking\"],\"description\":\"I'll give ya something to walk about\"},{\"triggers\":[\"wanted\"],\"description\":\"excuse me ur under arrest\"},{\"triggers\":[\"warp\"],\"description\":\"Your least favorite command is back!\"},{\"triggers\":[\"whodidthis\",\"wdt\"],\"description\":\"who did this 😂😂😂\"},{\"triggers\":[\"youtube\",\"comment\"],\"description\":\"saying first is still funny...\"}],\"😂 Memey\":[{\"triggers\":[\"4chan\"],\"description\":\"Yes these 4chan posts come from reddit. Get over it, reddit is better.\"},{\"triggers\":[\"antiantijoke\",\"badbadjoke\",\"notanotajoke\"],\"description\":\"not not even funny\"},{\"triggers\":[\"antijoke\",\"badjoke\",\"notajoke\"],\"description\":\"not even funny\"},{\"triggers\":[\"blacktwitter\",\"blackpeopletwitter\",\"btwitter\"],\"description\":\"It isnt racist, its just funny\"},{\"triggers\":[\"chucknorris\",\"chuck\",\"norris\"],\"description\":\"Let's learn about God\"},{\"triggers\":[\"comics\",\"comic\"],\"description\":\"See some s1ck new comics from the past week\"},{\"triggers\":[\"copypasta\",\"shitpost\"],\"description\":\"See the top copypastas on reddit!\"},{\"triggers\":[\"create\",\"memecreate\",\"memegen\",\"makememe\"],\"description\":\"Make some hot new memes on your own!\"},{\"triggers\":[\"discordmeme\",\"dmeme\",\"discord\"],\"description\":\"A random Discord-themed meme!\"},{\"triggers\":[\"discordstudio\",\"dstudio\"],\"description\":\"Discord studio webcomic\"},{\"triggers\":[\"facepalm\",\"smh\"],\"description\":\"Images that make you facepalm\"},{\"triggers\":[\"fml\",\"fuckmylife\"],\"description\":\"Think you're having a bad day?\"},{\"triggers\":[\"joke\",\"funny\"],\"description\":\"See a funny joke. Dad's love them!\"},{\"triggers\":[\"meirl\",\"me_irl\"],\"description\":\"same tbh\"},{\"triggers\":[\"meme\",\"maymay\",\"meemee\"],\"description\":\"See the top new memes on reddit!\"},{\"triggers\":[\"memeeconomy\",\"memeecon\"],\"description\":\"See what memes are being invested in the most today\"},{\"triggers\":[\"prequel\",\"pmeme\"],\"description\":\"The force is NOT with these\"},{\"triggers\":[\"pun\",\"dadjoke\"],\"description\":\"Are they dad jokes, or are they puns? Is there even a difference?\"},{\"triggers\":[\"sequel\",\"smeme\"],\"description\":\"The force is NOT with these\"},{\"triggers\":[\"surreal\",\"surrealmemes\"],\"description\":\"I really do not understand these\"},{\"triggers\":[\"tifu\",\"todayifuckedup\"],\"description\":\"You really fucked up this time\"},{\"triggers\":[\"wholesome\",\"wmeme\",\"wholesomememe\"],\"description\":\"Good wholesome memes for the heart\"},{\"triggers\":[\"xkcd\"],\"description\":\"Grabs a random comic from [xkcd](https://xkcd.com/)\"}],\"🔨 Moderation\":[{\"triggers\":[\"ban\",\"hackban\"],\"description\":\"Warning, this will ban your target if the bot has the correct permissions\"},{\"triggers\":[\"biggay\"],\"description\":\"Give somebody the big gay\"},{\"triggers\":[\"clean\",\"purge\",\"clear\"],\"description\":\"Will quickly clean the last 10 messages, or however many you specify.\"},{\"triggers\":[\"decancer\",\"uncancer\",\"dehoist\"],\"description\":\"Warning, this will rename any people with crappy/annoying special characters in their name if the bot has the correct permissions\"},{\"triggers\":[\"kick\",\"boot\"],\"description\":\"Warning, this will kick your target if the bot has the correct permissions\"},{\"triggers\":[\"lock\",\"lockdown\",\"ld\"],\"description\":\"Warning, this will remove send message permissions from @everyone if the bot has the correct permissions\"},{\"triggers\":[\"massban\",\"bigban\"],\"description\":\"Warning, this will ban your target if the bot has the correct permissions\"},{\"triggers\":[\"massnick\",\"massname\"],\"description\":\"Warning, this will rename everyone on the server if the bot has the correct permissions\"},{\"triggers\":[\"nameme\",\"nickme\",\"nicknameme\",\"nickname\"],\"description\":\"Let Dank Memer choose you a random new nickname\"},{\"triggers\":[\"randomban\",\"banroulette\"],\"description\":\"Warning, this will ban a random person.\"},{\"triggers\":[\"randomkick\",\"kickroulette\"],\"description\":\"Warning, this will kick a random person.\"},{\"triggers\":[\"softban\",\"kickban\"],\"description\":\"Warning, this will ban your target if the bot has the correct permissions\"},{\"triggers\":[\"unban\",\"removeban\",\"rmban\"],\"description\":\"Unbans any person who has previously been banned from this server. Requires a valid user ID\"},{\"triggers\":[\"unlock\",\"removelock\",\"ulock\"],\"description\":\"Removes the lock from a channel by granting @everyone send message perms again\"},{\"triggers\":[\"voicekick\",\"vckick\"],\"description\":\"Kicks a specified user from the voice channel they are in, or kicks all members in a voice channel when a channel is specified\"}],\"😏 NSFW\":[{\"triggers\":[\"4k\",\"HD\",\"4kporn\"],\"description\":\"See some 4k nudes!\"},{\"triggers\":[\"anal\",\"asshole\"],\"description\":\"owo lewd\"},{\"triggers\":[\"bdsm\"],\"description\":\"I do not like to be dominated, but these people do\"},{\"triggers\":[\"black\"],\"description\":\"Black is back\"},{\"triggers\":[\"blowjob\",\"bjb\"],\"description\":\"Blowjob, ok\"},{\"triggers\":[\"boobies\",\"boobs\",\"tits\"],\"description\":\"See some cute ~~birbs~~ boobs!\"},{\"triggers\":[\"booty\",\"ass\"],\"description\":\"Come get you some ass.\"},{\"triggers\":[\"bottomless\"],\"description\":\"My dad use to walk around bottomless. It was nothing like this though.\"},{\"triggers\":[\"cumslut\"],\"description\":\"cumsluts, ok\"},{\"triggers\":[\"dpgirls\"],\"description\":\"Double penetration\"},{\"triggers\":[\"easter\"],\"description\":\"Easter based porn\"},{\"triggers\":[\"gayp\",\"gayporn\"],\"description\":\"See some 4k nudes!\"},{\"triggers\":[\"group\"],\"description\":\"You need group therapy after this\"},{\"triggers\":[\"hentai\"],\"description\":\"owo lewd\"},{\"triggers\":[\"lesbian\",\"girlongirl\"],\"description\":\"So apparently naked guys weren't enough for you. Have some girls.\"},{\"triggers\":[\"pawg\"],\"description\":\"phat ass white girl\"},{\"triggers\":[\"pokeporn\",\"ewitspokemonhavingsex\"],\"description\":\"Why tf would someone want pokeporn\"},{\"triggers\":[\"porngif\",\"porn\"],\"description\":\"Basically a porn video but with gifs\"},{\"triggers\":[\"tats\",\"tattoos\"],\"description\":\"women with tattoos\"},{\"triggers\":[\"thighs\"],\"description\":\"sexiness is held in the thighs\"},{\"triggers\":[\"tiny\"],\"description\":\"tiny porn?\"},{\"triggers\":[\"toys\",\"sextoys\"],\"description\":\"Relive your childhood, except very different!\"},{\"triggers\":[\"traps\"],\"description\":\"TRAPS!!!\"},{\"triggers\":[\"vday\"],\"description\":\"vday based pron\"},{\"triggers\":[\"xmas\"],\"description\":\"christmas themed pron\"}],\"🔊 Sound\":[{\"triggers\":[\"addclip\"],\"description\":\"Add a soundboard clip to the bot, it must be in opus format\"},{\"triggers\":[\"addnowplaying\",\"addnp\",\"addcurrent\"],\"description\":\"Add the currently playing song to one of your custom playlists\"},{\"triggers\":[\"bassboost\",\"bb\"],\"description\":\"Change the amount of bass from none all the way to eargasm, at your own risk\"},{\"triggers\":[\"cleardupes\",\"removedupes\",\"cd\"],\"description\":\"Remove duplicate songs from the queue\"},{\"triggers\":[\"clearqueue\",\"clearq\",\"cq\"],\"description\":\"Removes all items from the queue besides the current playing song\"},{\"triggers\":[\"createplaylist\",\"cp\"],\"description\":\"Create an empty playlist, useful if you just want it to include other playlists. Or you can save an external playlist as a custom playlist using `{command} [link] [public|private] [name]`\"},{\"triggers\":[\"deleteclip\"],\"description\":\"Removes a custom sound clip from the bot\"},{\"triggers\":[\"deleteplaylist\",\"dp\"],\"description\":\"Delete one of your custom playlists\"},{\"triggers\":[\"disconnect\",\"stop\",\"dc\",\"leave\"],\"description\":\"Stop the music and make the bot leave your voice channel all at once, if you don't want it to leave, just use the pause command\"},{\"triggers\":[\"dj\",\"deejay\"],\"description\":\"Add, remove, or list the DJs on this server. You can add and remove DJs like `{command} [add|remove] [user]` and list the users set as DJ with `{command} list [page]`\\n\\nUsers set as DJ can bypass votes and stop the music (among other things like bassboost) regardless of if there's other people listening to it\"},{\"triggers\":[\"dmnowplaying\",\"dmnp\"],\"description\":\"Sends you the URL of the track in your direct messages\"},{\"triggers\":[\"earrape\",\"earblast\",\"veryloud\",\"extremebass\"],\"description\":\"absolutely just blast your ears, turns both volume and bassboost to max values\"},{\"triggers\":[\"fastforward\",\"ff\"],\"description\":\"Skip the music forward the given amount of time\"},{\"triggers\":[\"includeplaylist\",\"inclplaylist\",\"ip\"],\"description\":\"Include a playlist into one of yours, allowing you to load it alongside yours\"},{\"triggers\":[\"leavecleanup\",\"lc\"],\"description\":\"Remove the songs requested by users that are no longer in the voice channel from the queue\"},{\"triggers\":[\"listclip\",\"listclips\",\"clips\"],\"description\":\"Lists your custom sound clips\"},{\"triggers\":[\"loadplaylist\",\"lp\"],\"description\":\"Load one of your playlists into the queue, to load someone else's playlists, use `{command} [user] [playlist name]` or `{command} [playlist id]`\\n\\nThere are a few default playlists you can load with `{command} default [playlist name]`\"},{\"triggers\":[\"loop\",\"repeat\"],\"description\":\"sets the repeat mode, can be used to loop the entire queue or just one song\"},{\"triggers\":[\"movesong\",\"move\",\"mv\"],\"description\":\"Move the song at the given position to the given new position in the queue\"},{\"triggers\":[\"nowplaying\",\"np\"],\"description\":\"Shows information about the current playing track\"},{\"triggers\":[\"pause\"],\"description\":\"pause the current music, can be resumed with the resume command\"},{\"triggers\":[\"play\",\"add\",\"p\"],\"description\":\"add a song to queue and play it, you can link a specific song or even just use a search term and the bot will help select the right one\"},{\"triggers\":[\"playclip\"],\"description\":\"Plays a custom sound clip\"},{\"triggers\":[\"playlist\"],\"description\":\"This is a central interface to manage your playlists, you can:\\n-Delete a playlist with `{command} [playlist name or ID] delete`\\n-Remove songs from the playlist by similar name with `{command} [playlist name or ID] removebyname [song name]`\\n-Change the privacy of a playlist with `{command} [playlist name or ID] updateprivacy`\\n-See the tracks in a playlist with `{command} [playlist name or ID] tracks [page]`\\n-Remove a song from the playlist by position with `{command} [playlist name or ID] remove [position]`\"},{\"triggers\":[\"playnext\",\"addnext\",\"pn\"],\"description\":\"add a song to queue and them to the top of the queue as well\"},{\"triggers\":[\"queue\",\"songs\",\"q\"],\"description\":\"Lists all of the songs currently in the queue\"},{\"triggers\":[\"removesong\",\"remove\",\"rs\"],\"description\":\"Remove the song at the given position in the queue\"},{\"triggers\":[\"replay\",\"restartsong\"],\"description\":\"replay the current song from the beginning\"},{\"triggers\":[\"resume\"],\"description\":\"Resume any paused song\"},{\"triggers\":[\"rewind\"],\"description\":\"Go back in the song the given amount of time\"},{\"triggers\":[\"saveplaylist\",\"sp\"],\"description\":\"Save the current queue as one of your custom playlist that you can load later\"},{\"triggers\":[\"seek\"],\"description\":\"Seek to the given position in a song\"},{\"triggers\":[\"seeplaylists\",\"showplaylists\"],\"description\":\"See your playlists or other users playlist, to see someone else's playlists, use `{command} [user]`\\n\\nYou can see the default playlists with `{command} default`\"},{\"triggers\":[\"showplaylist\",\"seeplaylist\"],\"description\":\"See your playlists info or other users playlist info, to see someone else's playlist info, use `{command} [user] [playlist name]` or `{command} [playlist id]`\"},{\"triggers\":[\"showsong\"],\"description\":\"Display information about a song in the queue\"},{\"triggers\":[\"shuffle\"],\"description\":\"shuffle the queue up\"},{\"triggers\":[\"skip\",\"next\"],\"description\":\"Skips the current song\"},{\"triggers\":[\"skipto\"],\"description\":\"Skip to the song at the given position\"},{\"triggers\":[\"summon\",\"join\"],\"description\":\"Make the bot join your voice channel so you can play some tunes\"},{\"triggers\":[\"unincludeplaylist\",\"uninclplaylist\",\"uip\",\"removeincludedplaylist\",\"rip\"],\"description\":\"Removes an included playlist from one of your custom playlists\"},{\"triggers\":[\"updateplaylist\",\"up\"],\"description\":\"Replace the tracks of one of your playlist with the current queue or update a playlist's privacy\"},{\"triggers\":[\"volume\",\"v\"],\"description\":\"changes the volume of the music\"}],\"🆗 Text\":[{\"triggers\":[\"addtag\",\"createtag\"],\"description\":\"Creates a new tag\"},{\"triggers\":[\"clap\",\"clapify\"],\"description\":\"Make the bot say whatever you want with sass!\"},{\"triggers\":[\"deletetag\",\"deltag\"],\"description\":\"Deletes an existing tag\"},{\"triggers\":[\"emojify\"],\"description\":\"Make the bot say whatever you want with emojis!\"},{\"triggers\":[\"greentext\",\">\",\"gt\"],\"description\":\"Make the bot say whatever you want with greentext\"},{\"triggers\":[\"leetify\",\"leet\",\"1337\"],\"description\":\"B3C0M3 4N l337 h4X0R\"},{\"triggers\":[\"lenny\"],\"description\":\"you know what lenny is, everyone does.\"},{\"triggers\":[\"listtags\",\"listtag\",\"lstags\"],\"description\":\"Lists all of the available tags created on this server\"},{\"triggers\":[\"owo\"],\"description\":\"owo whats this\"},{\"triggers\":[\"partyfrog\",\"party\"],\"description\":\"Make the bot say whatever you want in party frog form!\"},{\"triggers\":[\"say\",\"repeat\"],\"description\":\"Make the bot say whatever you want!\"},{\"triggers\":[\"spoiler\",\"annoyingspoiler\"],\"description\":\"Make the bot say whatever you want in annoying spoiler form!\"},{\"triggers\":[\"tag\"],\"description\":\"Posts the contents of a tag\"},{\"triggers\":[\"vaporwave\",\"aesthetics\"],\"description\":\"Make the bot say whatever you want with a bit of vapor\"},{\"triggers\":[\"weebify\",\"owoify\"],\"description\":\"Make the bot say whatever you want with a bit of weeb\"}],\"🛠 Utility\":[{\"triggers\":[\"botlist\",\"topbots\",\"carbon\"],\"description\":\"Top bots listed on carbonitex\"},{\"triggers\":[\"choose\"],\"description\":\"Dank Memer will choose something for you\"},{\"triggers\":[\"color\",\"visualize\"],\"description\":\"Visualize any hex or rgb color\"},{\"triggers\":[\"commands\",\"command\",\"cmd\",\"cmds\"],\"description\":\"See a list of commands available, all on discord. If you run pls cmd <name of a command> It will also give you more info such as a description\"},{\"triggers\":[\"help\",\"helpme\"],\"description\":\"Get help with using Dank Memer!\"},{\"triggers\":[\"invite\",\"support\",\"server\",\"links\"],\"description\":\"Get an invite for the bot or to the support server. Also some extra links to use.\"},{\"triggers\":[\"link\"],\"description\":\"Link your Discord account with Patreon\"},{\"triggers\":[\"notifications\",\"notifs\"],\"description\":\"View your notifications\"},{\"triggers\":[\"ping\"],\"description\":\"test cmd plz ignore\"},{\"triggers\":[\"premium\",\"patreon\",\"donate\"],\"description\":\"See how you can donate to the bot to support the development and get some sweet perks!\"},{\"triggers\":[\"reset\",\"resetself\"],\"description\":\"Reset all your currency data\"},{\"triggers\":[\"rules\"],\"description\":\"See Dank Memer's rules\"},{\"triggers\":[\"serverinfo\",\"si\"],\"description\":\"See info about this server\"},{\"triggers\":[\"snipe\",\"sniper\"],\"description\":\"Shows the last deleted message from a specified channel\"},{\"triggers\":[\"stats\"],\"description\":\"Returns basic information and statistics about Dank Memer.\"},{\"triggers\":[\"userinfo\",\"ui\"],\"description\":\"See info about some\"},{\"triggers\":[\"vote\"],\"description\":\"Get the links to vote for Dank Memer\"},{\"triggers\":[\"website\",\"site\"],\"description\":\"Come check out our website!\"},{\"triggers\":[\"whatshard\"],\"description\":\"See what shard your server is on\"}]};\n\n//# sourceURL=webpack:///./src/app/Pages/Commands/commands.json?");

/***/ }),

/***/ "./src/app/Pages/Commands/index.jsx":
/*!******************************************!*\
  !*** ./src/app/Pages/Commands/index.jsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Commands; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _CmdTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CmdTable */ \"./src/app/Pages/Commands/CmdTable/index.jsx\");\n/* harmony import */ var _commands_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./commands.json */ \"./src/app/Pages/Commands/commands.json\");\nvar _commands_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./commands.json */ \"./src/app/Pages/Commands/commands.json\", 1);\n/* harmony import */ var _Commands_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Commands.scss */ \"./src/app/Pages/Commands/Commands.scss\");\n/* harmony import */ var _Commands_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Commands_scss__WEBPACK_IMPORTED_MODULE_3__);\nfunction _extends(){_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};return _extends.apply(this,arguments);}class Commands extends react__WEBPACK_IMPORTED_MODULE_0__[\"PureComponent\"]{componentDidMount(){if(window.location.search){window.history.pushState(null,null,'commands');}}getColumns(){const columns=Array(3).fill(0).map(()=>[]);const entries=Object.entries(_commands_json__WEBPACK_IMPORTED_MODULE_2__);for(const entry of entries){const[category,data]=entry;let index;switch(category){case'😏 NSFW':continue;case'😄 Fun':case'😂 Memey':case'🔊 Sound':index=0;break;case'⚙ Config':case'🔨 Moderation':case'🆗 Text':case'🛠 Utility':case'🎲 Games':case'🐶 Animals':index=1;break;case'💰 Currency':case'📷 Image':index=2;break;default:index=entries.indexOf(entry)%columns.length;}columns[index].push({category,data});}return columns;}render(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"content commands-page\"},this.getColumns().map((tables,index)=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{key:index,className:\"command-column\"},tables.map(data=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CmdTable__WEBPACK_IMPORTED_MODULE_1__[\"default\"],_extends({key:data.category},data))))));}}\n\n//# sourceURL=webpack:///./src/app/Pages/Commands/index.jsx?");

/***/ })

}]);