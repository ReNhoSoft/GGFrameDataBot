import { Discord } from "../discord/DiscordDefinitions.js";
import { IBotCommandInput } from "../discordBot/BotCommand.js";
import { Command, Slash } from "../discordBot/decorators.js";
import { DiscordInteraction, DiscordMessageEmbed } from "../discordBot/MessageBuilder/DiscordMessaging.js";
import { FrameDataComponent } from "../frameDataComponent/frameDataComponent.js";
import { RHLogger } from "../helpers/rhlogger.js";

interface IXrdFDInput {
    character: string;
    moveName: string;
    isMoveFocused: boolean;
}

@Command()
export class XrdFrameDataCommand {

    private readonly XRD_CODE = "GGXRD";
    private readonly FD_SIMPLE_PROPERTY_LIST = ["input", "name", "startup", "active", "recovery", "guard", "level", "onBlock", "damage", "invuln"];
    private readonly BUCKET_BASE_URL = "https://s3.amazonaws.com/framedata.renhosoft.net"

    fdComponent: FrameDataComponent;
    characterAutoCompleteLimit: number = 20;
    moveAutoCompleteLimit: number = 20;

    constructor() {
        this.fdComponent = new FrameDataComponent();
    }

    //#region GGXRD frame data lookup command
    @Slash("fd", "Lookup framedata for a character", [Discord.EInteractionType.APPLICATION_COMMAND], [
        {
            type: 3,
            name: "character",
            description: "Who do we want to know about today?",
            required: true,
            choices: [
            {
                "name": "Kum_Haehyun",
                "value": "KUM"
            },
            {
                "name": "Elphelt_Valentine",
                "value": "ELP"
            },
            {
                "name": "Ky_Kiske",
                "value": "KY"
            },
            {
                "name": "Sol_Badguy",
                "value": "SOL"
            },
            {
                "name": "Ramlethal_Valentine",
                "value": "RAM"
            },
            {
                "name": "Raven",
                "value": "RVN"
            },
            {
                "name": "Sin_Kiske",
                "value": "SIN"
            },
            {
                "name": "Johnny",
                "value": "JOH"
            },
            {
                "name": "May",
                "value": "MAY"
            },
            {
                "name": "Leo_Whitefang",
                "value": "LEO"
            },
            {
                "name": "Chipp_Zanuff",
                "value": "CHI"
            },
            {
                "name": "Millia_Rage",
                "value": "MIL"
            },
            {
                "name": "Baiken",
                "value": "BAI"
            },
            {
                "name": "Answer",
                "value": "ANS"
            },
            {
                "name": "Zato-1",
                "value": "ZAT"
            },
            {
                "name": "Potemkin",
                "value": "POT"
            },
            {
                "name": "I-No",
                "value": "INO"
            },
            {
                "name": "Slayer",
                "value": "SLA"
            },
            {
                "name": "Venom",
                "value": "VEN"
            },
            {
                "name": "Axl_Lowe",
                "value": "AXL"
            },
            {
                "name": "Dizzy",
                "value": "DIZ"
            },
            {
                "name": "Faust",
                "value": "FAU"
            },
            {
                "name": "Bedman",
                "value": "BED"
            },
            {
                "name": "Jack-O",
                "value": "JAC"
            },
            {
                "name": "Kuradoberi_Jam",
                "value": "JAM"
            }
            ]
        },
        {
            type: 3,
            name: "move",
            description: "What move are you looking for?",
            required: true,
            autocomplete: true
        }
    ])
    getXrdFrameData(input: any, arg2: IBotCommandInput): DiscordInteraction {
        try {
            // Parse input
            let fdInput = {
                character: input.data.options[0]?.value,
                moveName: input.data.options[1]?.value,
                isMoveFocused: input.data.options[1]?.focused == true,
            }

            if (arg2.interactionType == Discord.EInteractionType.APPLICATION_COMMAND) {
                return this.getInteraction(fdInput);
            }
            if (arg2.interactionType == Discord.EInteractionType.APPLICATION_COMMAND_AUTOCOMPLETE) {
                return this.getAutocomplete(fdInput);
            }
        }
        catch (error) {
            RHLogger.error("Error" + error);
            return DiscordInteraction.createBasicErrorInteraction("Uh oh, something went wrong!");
        }
    }
    //#endregion

    private getInteraction(fdInput: IXrdFDInput): DiscordInteraction {
        // Get frame data from component
        let move = this.fdComponent.getMove(this.XRD_CODE, fdInput.character, fdInput.moveName);
        if (!move) {
            return DiscordInteraction.createBasicErrorInteraction("Sorry, I couldn't find the move you were looking for!", "Oh no!")
        }
        // Transform the resulting data into an interaction
        let interaction = DiscordInteraction.createBasicInteraction();
        let embed = new DiscordMessageEmbed();

        embed.title = `${move.character.name} - ${fdInput.moveName}`;
        embed.thumbnail = { url: this.BUCKET_BASE_URL + "/GGXRD/" + move.character.code + "/Icon.png" };
        embed.image = { url: this.BUCKET_BASE_URL + "/GGXRD/" + move.character.code + "/" + move.code + ".png", height:400, width:400};
        embed.color = 0xFF7700;

        this.FD_SIMPLE_PROPERTY_LIST.forEach((property) => {
            if (move.properties.has(property) && move.properties.get(property)) {
                embed.addField({
                    name: property,
                    value: move.properties.get(property),
                    inline: true
                })
            }
        });
        interaction.message.addEmbed(embed);

        return interaction;
    }

    // Gets the first 5 items that match the given criteria
    getAutocomplete(fdInput: IXrdFDInput): any {
        let result = new Array();
        let game = this.fdComponent.getGame(this.XRD_CODE);
        if (fdInput.isMoveFocused) {
            let character = this.fdComponent.getCharacter(this.XRD_CODE, fdInput.character);
            if (character) {
                character.scanMovelist(fdInput.moveName, this.moveAutoCompleteLimit).forEach((move) => {
                    result.push({
                        name: move,
                        value: move
                    });
                });
            }
        }

        return DiscordInteraction.createAutocompleteInteraction(result);
    }
}