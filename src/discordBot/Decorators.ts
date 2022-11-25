import { ConstructorDeclaration } from 'typescript';
import { Discord } from '../discord/DiscordDefinitions.js'
import { BotCommand } from './BotCommand.js';
import { DiscordBot } from './discordBot.js';
import { Metadata } from './Metadata.js';

// TODO: Implement separate decorated methods for each interaction type/validate method is implemented for the interaction type
// TODO: Refactor decorators to invoke methods using the object itself as the execution context to allow them access to memebers and methods.
export function Slash(
  name: string,
  description: string,
  interactionTypes: Discord.EInteractionType[],
  options?: Discord.IApplicationCommandOption[]
): any {
  return function (target: any, propertyKey: PropertyKey, descriptor: PropertyDescriptor)  {
    //const command = new BotCommand(target[propertyKey], name, description, Discord.EApplicationCommandType.CHAT_INPUT, options);
    //DiscordBot.CommandRegistry.add(name, Discord.EInteractionType.APPLICATION_COMMAND, command);

    const interactionDetails = {
      name: name,
      clazzName: target.constructor.name,
      description: description,
      callbackName:propertyKey as string
    }
    Metadata.RegisterInteraction(interactionDetails, options);
  };
}

export function Command() {
  return function(constructor: any) {
    const instance = new constructor();
    Metadata.RegisterCommandObject(instance, constructor.name)
  }
}