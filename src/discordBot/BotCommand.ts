import { Discord } from '../discord/DiscordDefinitions.js';
import { callbackTwoParameters } from '../helpers/interfaces.js';
import { Metadata } from './Metadata.js';


/**
 * Represents a bot command. Contains all configuration and data required to register the command to Discord,
 * and can contain handlers for multiple application command types to handle different types of interactivity.
 * 
 * At minimum, each Bot command must have at least one primary callback function
 */
export class BotCommand implements Discord.IApplicationCommand {

    constructor (instance:any,
                    callbackName:string,
                    name:string, 
                    description:string = null,
                    type:Discord.EApplicationCommandType, 
                    options:Discord.IApplicationCommandOption[]
                    ){
        this.instance = instance;
        this.callbackName = callbackName;
        this.name = name;
        this.type = type;
        this.description = description;
        this.options = options;
    }

    private instance: any;
    private callbackName: string;

    id: string;
    type: Discord.EApplicationCommandType;
    application_id: string;
    guild_id?: string | undefined;
    name_localizations?: any;
    description_localizations?: any;
    default_member_permissions?: string | undefined;
    dm_permission?: boolean | undefined;
    default_permission?: boolean | undefined;
    version: string;
    name: string;
    interactionType: Discord.EInteractionType;
    description: string;
    options?: Discord.IApplicationCommandOption[];



    execute(arg1:any, arg2:IBotCommandInput): string{
        return this.instance[this.callbackName](arg1, arg2);
    }
}

export interface IBotCommandInput {
    interactionType: Discord.EInteractionType;
}