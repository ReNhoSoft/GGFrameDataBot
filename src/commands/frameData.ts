// import { Discord } from "../discord/DiscordDefinitions.js";
// import { IBotCommandInput } from "../discordBot/BotCommand.js";
// import { Command, Slash } from "../discordBot/decorators.js";
// import { DiscordInteraction, DiscordMessageEmbed } from "../discordBot/MessageBuilder/DiscordMessaging.js";
// import { FrameDataComponent } from "../frameDataComponent/frameDataComponent.js";
// import { RHLogger } from "../helpers/rhlogger.js";

// interface IFrameDataInput {
//     gameName: string;
//     character: string;
//     moveName: string;
//     isCharFocused: boolean;
//     isMoveFocused: boolean;
// }

// @Command()
// export class FrameDataCommand {

//     fdComponent: FrameDataComponent;
//     characterAutoCompleteLimit:number = 5;
//     moveAutoCompleteLimit: number = 5;

//     constructor() {
//         this.fdComponent = new FrameDataComponent();
//     }

//     //#region FrameData lookup
//     @Slash("fd1", "Frame Data lookup command", [Discord.EInteractionType.APPLICATION_COMMAND], [
//         {
//             type: 3,
//             name: "game",
//             description: "Game to search the framedata from",
//             required: true,
//             choices: [{
//                 name: "Guilty Gear Strive",
//                 value: "GGST"
//             },
//             {
//                 name: "Guilty Gear Xrd Rev2.1",
//                 value: "GGXRD"
//             }
//             ]
//         },
//         {
//             type: 3,
//             name: "char",
//             description: "The name of the character",
//             required: true,
//             autocomplete: true
//         },
//         {
//             type: 3,
//             name: "move",
//             description: "The move to lookup, i.e. 5P",
//             required: true,
//             autocomplete: true
//         },
//     ])
//     getFrameData(input: any, arg2: IBotCommandInput): DiscordInteraction {
//         try {
//             // Parse input
//             let fdInput = {
//                 gameName: input.data.options[0]?.value,
//                 character: input.data.options[1]?.value,
//                 moveName: input.data.options[2]?.value,
//                 isCharFocused: input.data.options[1]?.focused == true,
//                 isMoveFocused: input.data.options[2]?.focused == true,
//             }

//             if (arg2.interactionType == Discord.EInteractionType.APPLICATION_COMMAND) {
//                 return this.getFrameDataInteraction(fdInput);
//             }
//             if (arg2.interactionType == Discord.EInteractionType.APPLICATION_COMMAND_AUTOCOMPLETE) {
//                 return this.getAutocomplete(fdInput);
//             }
//         }
//         catch (error) {
//             RHLogger.error("Error" + error);
//             return DiscordInteraction.createBasicErrorInteraction("Uh oh, something went wrong!");
//         }
//     }
//     //#endregion

//     getFrameDataInteraction(fdInput: IFrameDataInput): DiscordInteraction {
//         // Get frame data from component
//         let move = this.fdComponent.getMove(fdInput.gameName, fdInput.character, fdInput.moveName);
//         if (!move) {
//             return DiscordInteraction.createBasicErrorInteraction("Sorry, I couldn't find the move you were looking for!", "Oh no!")
//         }
//         // Transform the resulting data into an interaction
//         let interaction = DiscordInteraction.createBasicInteraction();
//         let embed = new DiscordMessageEmbed();
//         embed.title = `${fdInput.gameName} - ${fdInput.character} - ${fdInput.moveName}`;
//         Object.entries(move.properties).forEach((property, index) => {
//             if (property[0]== "picture" || property[0] == "image") {
//                 embed.image = {
//                     url: property[1],
//                 }
//             } else {
//                 embed.addField({
//                     name: property[0],
//                     value: property[1],
//                     inline: true
//                 })
//             }
//         });
//         interaction.message.addEmbed(embed);

//         return interaction;
//     }

//     // Gets the first 5 items that match the given criteria
//     getAutocomplete(fdInput: IFrameDataInput): any {
//         let result = new Array();
//         let game = this.fdComponent.getGame(fdInput.gameName);
//         if (fdInput.isCharFocused) {
//             // if search key is empty, grab the top 5 elements of the collection
//             // search the character collection for something that matches the input
//             game.scanCharacters(fdInput.character, this.characterAutoCompleteLimit).forEach((character) => {
//                 result.push({
//                     name: character,
//                     value: character
//                 })
//             });
//         } else if (fdInput.isMoveFocused) {
//             let character = this.fdComponent.getCharacter(fdInput.gameName, fdInput.character);
//             if (character) {
//                 character.scanMovelist(fdInput.moveName, this.moveAutoCompleteLimit).forEach((move) => {
//                     result.push({
//                         name: move,
//                         value: move
//                     });
//                 });
//             }
//         }

//         return DiscordInteraction.createAutocompleteInteraction(result);
//     }

// }