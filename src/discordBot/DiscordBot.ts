import { BotCommands } from './BotCommands.js';
import { AWSHelper } from '../helpers/awsHelper.js'
import { Discord } from '../discord/DiscordDefinitions.js';
import { verifyKey } from 'discord-interactions';
import { DACRegister } from './DACRegister.js';
import { dirname, importx } from '@discordx/importer';
import { Metadata } from './Metadata.js';
import { RHLogger } from '../helpers/rhlogger.js';


interface ICommandDefinition {
    name: string;
    instance: any;
    botCommand: BotCommands;

}

export class DiscordBot {
    static readonly CommandRegistry: BotCommands = new BotCommands();
    private register: DACRegister;

    get commands() {
        return DiscordBot.CommandRegistry;
    }

    private botConfig: any;

    async init() {
        let helper = new AWSHelper();
        this.botConfig = JSON.parse(await helper.getSecretValue("prod/serverless_discord_bot/discord"))
        this.register = new DACRegister(this.botConfig.app_id, this.botConfig.bot_token);
        Metadata.MapCommands();
        return;
    }

    async registerGlobalCommands() {
        await this.register.registerGlobalCommands(DiscordBot.CommandRegistry.commandArray);
    }

    async registerCommands() {
        await this.register.registerCommandsForGuild(DiscordBot.CommandRegistry.commandArray, "987122838811078667");
    }

    async messageHandler(event: any) {
        RHLogger.debug(JSON.stringify(DiscordBot.CommandRegistry));
        RHLogger.debug(JSON.stringify(event));
        const bodyContent = event['body-json'];
        const params = event['params'];

        const { type, id, data } = bodyContent;

        try {
            const signature = params.header['x-signature-ed25519'];
            const timestamp = params.header['x-signature-timestamp'];

            if (!verifyKey(event['rawBody'], signature, timestamp, this.botConfig.public_key)) {
                throw `Invalid Key. \nSignature: ${signature} \nTimestamp: ${timestamp}`;
            }
        } catch (error) {
            throw `[UNAUTHORIZED] Invalid request signature: ${error}`;
        }

        if (type == Discord.EInteractionType.PING) {
            const result = { "type": Discord.EInteractionCallbackType.PONG };
            RHLogger.info('EVENT Ping requested, returning PONG \n' + JSON.stringify(result));
            return result;
        }

        const name = data.name;
        let command = this.commands.get(name, Discord.EInteractionType.APPLICATION_COMMAND)
        if (command) {
            RHLogger.info(`EVENT Command found, executing ${name}`)
            var result = command.execute(bodyContent, { interactionType: type });
            RHLogger.info("EVENT Command response \n" + JSON.stringify(result));
            return result;
        }
        RHLogger.warning(`EVENT No command match found.`);
    }
}
