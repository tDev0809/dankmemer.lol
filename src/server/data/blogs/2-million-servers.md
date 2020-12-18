It was 9 months and 24 days ago that Aetheryx and I were sitting in a voice call, rapidly debugging major issues plaguing our bot, including us hitting a global ratelimit on messages.

"Maybe we should reboot right now and try the update a third ti- Oh hey, we hit 1m guilds"
"We can hit 1m guilds again if we reboot and lose some angry servers"
Now we're at 2,000,000 servers. That's insane, and never something we would have thought of achieving. Unlike the lackluster announcement of hitting 1,000,000 servers, I've got some stuff to say to you all.

This article will have three parts. First part will be talking about 2m servers. The second part will be some fun numbers to share, as I love data and I know some of you do too. The final part will be talking about our plans for the next few months in greater detail than before.


---

2,000,000 servers have Dank Memer. That's just something that's kind of hard to imagine honestly. I started this bot as a first project to learning JavaScript and Node.js, and it's turned into so much more. There have definitely been ups and downs in the bot's life. At 1m servers, I privately told Aetheryx that I didn't want to celebrate too much, because I was honestly embarrassed at the state of the bot at the time.

Now we're 9 months and 1m servers later, and I couldn't be more proud of this bot and it's community. While there are still a ton of underlying issues that we're working to fix, we're in a really special period of it's lifespan that I can't take for granted. Our growth (partially due to COVID) is explosive, and more users are engaging than ever before.

I could ramble about how proud and amazed I am for 10 more paragraphs, but we'll end it here:
If you have used Dank Memer at any point, thank you. If you are one of those users who treats it like it's a full time job, thank you. If you financially support us, thank you. If you moderate our server, thank you. Thank you to everyone who has helped us reach this massive milestone, in times like these, you don't know how much it means to me. Thank you.


---

Enough of that cheesy stuff, and lets get to some numbers. I both want to share some internal numbers for those who like data, and I want to put down in writing some of these things to compare ourselves to at future milestones. If you don't care about numbers (most of which aren't public), skip to the third (and longest) section to see what's next for Dank Memer.

As of writing these, the bot is at 2,001,666 servers, and 8,084,799 users. (Real users that run commands, not just cached server members)
We run 48 clusters right now, and 960 shards spread across those clusters. We have 6,425 commits on Github JUST on the bot's repo. We have 21 repos on our Github team, some more useful than others, but all relating to Dank Memer or it's services.

In the last month, we've grown by 236k servers. In the last day, 9119 servers. At our current projected rate of growth, 3 months from now we could be near 2.4m servers. Our server retention sits at 49% for the month, up from 42% a year ago.

In the last 24 hours: We've processed 11.4m commands, 851k people hit our ratelimits, 75k currency events spawned, there were 18k autoresponses (mostly dad jokes), 15k level ups, 13k used pinkphallics, 46% of gambles were wins, and 60% of steals were successful.

In the last week, we've had 46k disconnects, 42k resumes, and 6.5k readies. (Discord stats, disconnects aren't bad as long as they resume, which most do)


---

## Our Plans for the next few months
I've hinted at some of our plans in our general chat, and made a few vague announcements over the last few weeks about what's coming soon, so now it's time for us to really share some stuff.

Up first, we are working on an entire bot rewrite. Our code for the back end is the essentially same code from when the bot hit around 50k servers. It was never meant to scale to this level, and at times we've all felt the repercussions of this (bot lag, major exploits, etc). So first up, Aetheryx and I are rewriting it all from the ground up. It will essentially be an entirely new code base. While I know this sounds like "oh no what commands are changing!", but the reality is, MOST of the functionality you know and love will not change due to this rewrite. We're aiming to only change functionality that HAS to change, or isn't even intended in the first place. This is purely an upgrade to our infrastructure, so that we can spend less time rebooting the bot due to it's issues, and more time writing kick-ass code for future updates.

Next, a major currency update is in the works. This will come after the rewrite, which could take a few months. Reason being, if I spend all that time writing new code for the currency system NOW, poor aeth will have to rewrite it again once he gets to that portion of the bot rewrite. Our resources are better spent kicking out the rewrite first.

What's in the currency update? Well I'm not going to give too many specifics, but rather share my feelings and inspirations on the currency system.
Currency started as a pointless gamble and steal simulation, and had virtually no commands other than those two. While gambling and stealing are some of the things that still drive people to our game, it's clearly expanded a ton since then. I propose that we can keep gambling and stealing as major features, but also add alternative ways to "get rich" that are less repetitive and more fun. For instance, the fishing command is a big hit and pays out well in the long run. I grew up on games like the Elder Scrolls, Destiny, and Minecraft. You'll definitely see inspirations from those types of games in currency in the future.
What do I mean? What I'm imagining (but not *yet* planning until the rewrite is done) is stuff like incremental currency commands (earning interest, automatic revenue, etc). Stuff like skill trees and upgrades. Stuff like being able to craft some items you want, rather than just buying them. Stuff like more unique and collectible items, and more customization. I want this game to grow into an in depth currency game, not just "pls gamble 1, pls steal @aetheryx" over and over until your fingers bleed.

This will take time, but you're going to see (in coming months as we test things on beta bot) that this system is going to be bigger and better than ever before.
A dashboard would be pretty cool too, huh? We're pretty behind the curve in terms of common things that bots have these days, and a dashboard is something I want to add sooner than later. How cool would it be to see all your server/user settings on a dashboard with interactive toggles and such? Imagine a section where you can see the rich leaderboard for your server, or possibly even globally?

While you might not see more than QoL updates for the next few months as we work on that rewrite, rest assured we're working to make things bigger and better than before. I can't wait to see what milestones and new feature's we've shipped by 3m servers, and we couldn't do it without all of you. Thank you.