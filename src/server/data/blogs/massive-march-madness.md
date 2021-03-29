The last week has been a bit rough for our users and us, and this article will be a deep dive into what happened, how we fixed it, and what we're doing next.

## Last Week's Downtime

One week ago, on March 22nd, we had approximately 16 hours of downtime. This downtime was us moving our entire infrastructure from the dedicated server host ([scaleway](https://www.scaleway.com/en/)) we've used for nearly two years to custom-built hardware at [GalaxyGate](https://galaxygate.net/) (GG).

We decided to make this costly and necessary move because the other host has had continued hardware failure issues and daily [netsplits](https://searchnetworking.techtarget.com/definition/netsplit) that caused our bot to be down much more than necessary. We tried to avoid this by talking to their support multiple times throughout our time of being a customer, but we kept getting half-assed answers despite paying for business class support.

So we moved to GG on March 22nd, with a majority of the 16 hours being spent securing the servers and transferring your bot currency data. We ran into very few issues, and as far as things go for moving at this scale, it was a clean operation. We pushed the bot live, didn't see many issues, and figured all was fine. We had not yet seen the new issues' scope, which will be addressed in the section titled **Post-Interactions Server Debugging** further down the article.

## Interactions Chaos

We have been working with Discord behind the scenes to release some public [slash commands](https://support.discord.com/hc/en-us/articles/1500000368501-Slash-Commands-FAQ) (also known as interactions) for the last month and a half. It was an effort to have some larger bots introduce slash commands to show users how neat the new feature is. We released this feature shortly after Discord put out [an article](https://blog.discord.com/slash-commands-are-here-8db0a385d9e6) featuring us and a few other bots with slash commands.

At 3 am EST on March 27th, I woke up from a ton of mentions and a Direct Message from a Discord staff member letting us know we had incorrectly used [allowed mentions](https://discord.com/developers/docs/resources/channel#allowed-mentions-object) in our slash commands, allowing users to ping roles they didn't have permission to ping with our bot.

[Example of this issue](https://www.reddit.com/r/dankmemer/comments/me8bf8/bruh/)

Shortly after seeing this, I shut down the bot. There was a ton of hate being sent towards us on Reddit, Twitter, and Discord. Hundreds of posts with titles such as "Dank Memer exploit," "Dank Memer was hacked," "Dank Memer spamming" were blaming us for this as if we introduced this bug.

Soon after, [this GitHub comment](https://github.com/discord/discord-api-docs/issues/2498#issuecomment-808690876) came to light, along with a Discord message.

![Night explaining the issue](https://i.imgur.com/aaaUuSe.png)

It turns out it was NOT a bug on our end. We used allowed mentions correctly, but Discord broke their validation of allowed mentions causing the check to be ignored. EVERY BOT that had slash commands was vulnerable to this issue; Dank Memer just took the brunt of the heat because we were the largest bot where it was possible.

We are still taking the heat for this, despite it not being anything we caused. Discord has yet to make any form of more public announcement explaining the issue, sadly. Because of this, there is still misinformation going around that we were hacked, or we caused this bug and "broke Discord." We had (and still have) users blaming our two-person development team for our "laziness," "lack of quality control," and "incompetence." If you could help stop the spread of this, we would be very grateful, as Discord didn't find it necessary enough to make any form of user-facing announcement in our defense. 

Interactions are back live, and we didn't need to change any code because it was not our bug.

Later on the 27th, after finding out it wasn't our mistake and dealing with angry users everywhere, we decided to use the downtime/server lock to debug issues we've started to notice in the production bot with performance.

## Post-Interactions Server Debugging

We received reports of the bot latency getting increasingly dire, with some types of commands that took more than one set of input completely failing.

We started debugging and found some alarming issues with our new servers' connection to Discord through [CloudFlare](https://www.cloudflare.com/learning/what-is-cloudflare/).

![Timeouts](https://i.imgur.com/Mi3BeeK.png)

We found a large portion of our requests to Cloudflare were timing out. In short, there seems to be an ongoing issue with Cloudflare thinking our traffic is some web attack and automatically timing out our requests. Our host has since opened a ticket with them, and hopefully, Cloudflare will fix this soon.

In the meantime, while that gets resolved, rather than moving back to our old host that didn't seem to have this issue, Aetheryx, the backend developer, had some MASSIVE brain moments. We looked at using a proxy ([twilight](https://github.com/twilight-rs/twilight)) to send our traffic from the GG host to a [Google Compute](https://cloud.google.com/compute) instance, and from that instance, we send the traffic through Cloudflare to Discord. This way, we're going around the problematic connection GG has to Cloudflare on our new servers and can still host the bot infra itself on those GG servers.

This fix is by no means a final solution; it adds a bit of latency (mostly not noticeable at all) and is an extra cost and infra to deal with for us. However, it allows us to have the bot running with very few issues NOW rather than another day or two of downtime to move the bot back to Scaleway.

## What's Next?

Our priority is monitoring this new system and making sure things are running smoothly for you NOW. Secondarily, we are working with our host to resolve the Cloudflare issue to move past the bandaid fix of using the proxy.

After that, we'll resume regular updates and such on the bot.