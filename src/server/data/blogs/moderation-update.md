### Absolutely INSANE overhaul to moderation commands and features!!!

  #### What's New
   - New `pls mute` command to mute members in your server! A muted role will be automatically created in your server if one doesn't already exist
   - New `pls warn` command to warn members in your server
   - `pls role` to add/remove roles from members
   - `pls slowmode` to change the slowmode in the current channel or other channels
   - Moderation logs for users/the current server can now be tracked using `pls lookup` (alias `pls modlogs`)
   - You can also check the warnings for a specific user using `pls warnings [user]`
   - It is now possible to edit reasons on punishments using `pls editreason [case no.] [reason]`
   - Has somebody been a good kiddo? You can remove warnings issued using `pls removewarn [case no.]`
   - Added `pls editsnipe` to catch those cheeky edits alongside deletes
   - Gave `pls serverconf` a face-lift as well as brand new settings
   - Autoroles! You can use `pls serverconf autorole [role name]` to automatically apply a role to any new members
   - Starboard! You guys have been asking for it, so it's now possible to configure a starboard channel and star threshold for messages through `pls serverconf`
   - It's now possible to set a moderation role through `pls serverconf` if you don't want Dank Memer to rely on Discord permissions (only people with this role or higher can use moderation commands)
   - `pls log` command to set logging channels such as voice logs, member join/leave and even message edit/delete
   - If you manually apply a Muted role to somebody, or manually ban somebody yourself, Dank Memer will automatically create a punishment case and post it to the moderation log channel (if one is present)
   - You can apply automatic punishments to people who reach a certain amount of warnings, see pls warnaction for more info
   - Custom welcome/leave messages customizable using `pls welcome` and `pls leave`
   - Finally, timed punishments! Timed mutes, timed bans! Just add 1h, 1hour or "1 hour" after the user (note the quotations on that last one) if you want a one hour punishment 
       (for example, pls ban Nevulo 7d being cool). Of course, other time methods work too such as seconds, minutes, days and months

  #### What's Changed
 - Monumental changes to `pls decancer`!

   It's now possible to decancer singular users simply by mentioning them! `pls decancer Nevulo`
   
   `pls decancer` is now incredibly smart, featuring a one-of-a-kind system that will attempt to clean-up somebody's name by looking at the characters in the name, and mapping them to the proper English equivalent. It's not perfect (and it never will be), and if it fails to clean-up the name, it'll simply rename them to a generic statement.
   
   On top of this, decancer now requires that at least 65% of the name be "cancerous". This will prevent people with pretty normal names such as "Hello_Master" being renamed.

   Don't like this new smart system? You can always add `--aggressive` to the end of the command to make the bot pick up on any/all special characters like previously
   
   Other cool new features include `--non-destructive` which will tell you what will happen without performing any action, and a smarter cooldown system for server-wide decancers
   
 - Tags have been rewritten! Instead of `pls createtag`, you now use `pls tag create`, and it's now possible to edit tags as well as use little variables such as {user}!
 - `pls lock` will now lock the current channel by default
 - It's now possible to DM users on punishment using `pls serverconf dmpunishments` on
 - `pls snipe` will no longer work if you don't have access to view the channel
 - So many bug fixes I couldn't list them here if I tried

#### What's Coming soon
  Most/All of these should hit within a week with a quick patch, you won't wait long!

   - Timed bans
   - Mute/ban multiple people at once
   - Voice kick functionality
   - `pls clean users`

### Absolutely AVERAGE changes to other parts of the bot!!!

#### What's New
- `pls botland` for showing stats for the game https://bot.land
- Users who [nitro boost](https://support.discordapp.com/hc/en-us/articles/360028038352-Server-Boosting-) our [support server](https://discord.gg/meme) get some of our favorite donor perks:
  - Access to `pls redeem` which gives a lootbox each week
  - Access to nsfw commands
  - A hefty 5% multiplier for currency commands
  
  This feature can be activated within the [support server](https://discord.gg/meme) with `pls gimmeboost`. It must be reactivated within 10 days or you'll lose perks until reactivated

#### What's Changed
 - Fixed a bug with the audit log that crashed entire clusters
 - Fixed a trivia exploit
 - The pink phallic object has been removed from the shop! We hope you enjoyed it while it lasted!
 - Lots of minor changes and fixes that I honestly don't even remember


### Plans for future updates

For the next update, expect some new mini-games to play as well as commands to see stats for real games! We're gonna spend some time fixing, updating, and adding to our entire "games" category. If you have any suggestions for us, we'd love to hear them!