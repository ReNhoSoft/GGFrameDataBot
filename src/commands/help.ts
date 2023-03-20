import { Discord } from "../discord/DiscordDefinitions.js";
import { IBotCommandInput } from "../discordBot/BotCommand.js";
import { Command, Slash } from "../discordBot/decorators.js";
import { DiscordInteraction, DiscordMessageEmbed } from "../discordBot/MessageBuilder/DiscordMessaging.js";
import { FrameDataComponent } from "../frameDataComponent/frameDataComponent.js";
import { RHLogger } from "../helpers/rhlogger.js";

@Command()
export class HelpCommand {

    @Slash("help", "Learn about this bot", [Discord.EInteractionType.APPLICATION_COMMAND], [])
    help() {
        let interaction = DiscordInteraction.createBasicInteraction();
        let embed = new DiscordMessageEmbed();
        embed.title = `About`;
        embed.color = 0xFF7700;
        embed.description = `Hey there! Im May from the Jellyfish Pirates and I'm here to help you search for frame data for your favorite characters! Just type /fd to get started. This bot is still a WIP so if you notice anything wrong or would like more features added, please contact @ renhosoft#1325`;
        interaction.message.addEmbed(embed);
        let embed2 = new DiscordMessageEmbed();
        embed2.title = `Searching for a character`;
        embed2.color = 0xFF7700;
        embed2.image = { url:`https://s3.amazonaws.com/framedata.renhosoft.net/May+Help+1.png`, height:400, width:400};
        embed2.description = `After typing /fd youll need to pick a character. Feel free to select it from the drop down, or type in the field to filter out by name.`;
        interaction.message.addEmbed(embed2);
        let embed3 = new DiscordMessageEmbed();
        embed3.title = `Searching for a move`;
        embed3.color = 0xFF7700;
        embed3.image = { url:`https://s3.amazonaws.com/framedata.renhosoft.net/May+Help+2.png`, height:400, width:400};
        embed3.description = `Once you pick a Character  you'll have to pick a move! There's too many moves per character to display them all at once, so feel free to filter them using their name, their input or an alias. For instance, you can search for Axl's Spinning Chain Strike by typing Rensen`;
        interaction.message.addEmbed(embed3);
        interaction.message.flags = 64
        return interaction;
    }
}
