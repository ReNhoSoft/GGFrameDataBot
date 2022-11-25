import { Discord } from  "../discord/DiscordDefinitions.js"
import { BotCommand } from "./BotCommand.js";
import { DiscordBot } from "./discordBot.js";
interface MetadataInteractionInput {
    name: string,
    clazzName: string,
    callbackName: string,
    description?:string
}

export class Metadata {
    private static InteractionsDetail: {
        interaction: MetadataInteractionInput,
        config: Discord.IApplicationCommandOption[]
    }[] = [];

    private static Commands: Map<string, any> = new Map();

    static RegisterInteraction(interaction: MetadataInteractionInput, config: Discord.IApplicationCommandOption[]) {
        // TODO: Add to static collection to map objects and methods    
        this.InteractionsDetail.push({interaction, config});
    }

    static RegisterCommandObject(object:any, name:string){
        // TODO: Add the object instantiated from decorators to a collection
        this.Commands.set(name, object);
    }

    static MapCommands() {
        // TODO: Map the objects in the collection to their corresponding interactions and assing them to the appropriate command object.
        this,this.InteractionsDetail.forEach((interactionDetail, index) => {
            // If theres an instance object for the associated instance command
            if(this.Commands.has(interactionDetail.interaction.clazzName)) {
                let instance = this.Commands.get(interactionDetail.interaction.clazzName);
                // create command using the stored instance and add it to the general registry
                let command = new BotCommand(instance, 
                                            interactionDetail.interaction.callbackName,
                                            interactionDetail.interaction.name, 
                                            interactionDetail.interaction.description, 
                                            Discord.EApplicationCommandType.CHAT_INPUT, 
                                            interactionDetail.config);
                DiscordBot.CommandRegistry.add(command.name, Discord.EInteractionType.APPLICATION_COMMAND, command);
            }
        })
    }
} 