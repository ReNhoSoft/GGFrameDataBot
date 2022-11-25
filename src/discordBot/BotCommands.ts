import { Discord} from '../discord/DiscordDefinitions.js'
import { BotCommand } from './BotCommand.js';
/**
 * A collection of bot commands. Theyre stored using a Map with the following structure:
 * 
 *  Map < CommandName , Map < InteractionType , FunctionCallback >>
 * 
 * This presumes that a single command name can have multiple interaction types to allow
 * for better interactivity
 */
class BotCommands {
    private commands: Map<string, Map<Discord.EInteractionType, BotCommand>>;
    get commandArray(): Array<BotCommand> {
        let result = new Array<BotCommand>();
        this.commands.forEach((map, commandName) => {
            map.forEach((command, type) => {
                if(!result.includes(command)) {
                    result.push(command);
                }
            })
        });
        return result;
    }

    constructor() {
        this.commands = new Map<string, Map<Discord.EInteractionType, BotCommand>>();
    }

    get( name: string, interactionType: Discord.EInteractionType,) : BotCommand | undefined {
        return this.commands.get(name)?.get(interactionType);
    }

    add(name: string, interactionType: Discord.EInteractionType, command: BotCommand) : BotCommands {
        if(!this.commands.has(name)) {
            this.commands.set(name, new Map<Discord.EInteractionType, BotCommand>());
        }
        this.commands.get(name)?.set(interactionType, command);
        return this;
    }

    delete(name: string, interactionType: Discord.EInteractionType): BotCommands {
        this.commands.get(name)?.delete(interactionType);
        return this;
    }

    has(name: string, interactionType: Discord.EInteractionType): boolean  {
        let cmd = this.commands.get(name);
        return cmd ? cmd.has(interactionType) : false;
    }
}

export { BotCommands }