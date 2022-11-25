import { BotCommand } from "./BotCommand.js";
import fetch from 'node-fetch';
import { RHLogger } from "../helpers/rhlogger.js";

/**
 * Discord application command register utility
 */
export class DACRegister {
    // TODO: Parametrize the guild and applicationIDs
    applicationId: string;
    botId: string;
    constructor(applicationId: string, botId: string) {
        this.applicationId = applicationId;
        this.botId = botId;
    }


    private getGlobalUrl(): string {

        return `https://discord.com/api/v10/applications/${this.applicationId}/commands`;
    }

    private getGuildIdUrl(guildId: string): string {
        return `https://discord.com/api/v10/applications/${this.applicationId}/guilds/${guildId}/commands`;
    }
    private getUrl():string {
        return `https://discord.com/api/v10/applications/${this.applicationId}/commands`;
    }


    async registerCommandsForGuilds(commands: BotCommand[], guildIds: string[]): Promise<void> {
        for(let i=0; i<guildIds.length; i++) {
            let guildId = guildIds[i];
            await this.registerCommandsForGuild(commands, guildId);
        }
    }

    async registerCommandsForGuild(commands: BotCommand[], guildId: string): Promise<void> {
        for(let i=0; i < commands.length; i++) {
            let command = commands[i];
            // set a new item in the Collection
            // with the key as the command name and the value as the exported module
            let json = command;

            let headers = {
                "Authorization": "Bot " + this.botId,
                "Content-Type": "application/json"
            };

            //# or a client credentials token for your app with the applications.commands.update scope
            let response = await fetch(this.getGuildIdUrl(guildId), { method: 'post', body: JSON.stringify(json), headers: headers });
            let data = await response.json();   

            // TODO: Validate response from server
            RHLogger.debug("Response from Discord:" + data);
        }
    }
    async registerGlobalCommands(commands: BotCommand[]): Promise<void> {
        for(let i=0; i < commands.length; i++) {
            let command = commands[i];
            // set a new item in the Collection
            // with the key as the command name and the value as the exported module
            let json = command;

            let headers = {
                "Authorization": "Bot " + this.botId,
                "Content-Type": "application/json"
            };

            //# or a client credentials token for your app with the applications.commands.update scope
            let response = await fetch(this.getGlobalUrl(), { method: 'post', body: JSON.stringify(json), headers: headers });
            let data = await response.json();   

            // TODO: Validate response from server
            RHLogger.debug("Response from Discord:" + data);
        }
    }
}