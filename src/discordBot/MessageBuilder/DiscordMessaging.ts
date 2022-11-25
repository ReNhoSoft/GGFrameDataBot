import { IncompleteCompletionsCache } from 'typescript';
import { Discord } from '../../discord/DiscordDefinitions.js';


export enum DiscordInteractionContentType {
    MESSAGE = 1,
    AUTOCOMPLETE = 2,
    MODAL = 3
}

// TODO: Implement support for the rest of the available fields.
/**
 * Represents a discord message. Implements a variety of methods to populate the message with data in a clean matter.
 */
export class DiscordInteraction implements Discord.IInteractionResponse {

    type: Discord.EInteractionCallbackType;
    data?: Discord.IMessage | Discord.IAutoComplete | Discord.IModal;

    get message(): DiscordMessage {
        return this.data as DiscordMessage;
    }

    constructor(type: Discord.EInteractionCallbackType, data?: Discord.IMessage | Discord.IAutoComplete | Discord.IModal) {
        // IMPROV: Enable other message types
        // Hardcoded for now
        this.type = type;
        this.data = data;
    }

    createMessage(content?: string): DiscordMessage {
        const result = new DiscordMessage(content);
        this.data = result;
        return result;
    }

    static createAutocompleteInteraction(options: Discord.IApplicationCommandOptionChoice[]) {
        var interaction = new DiscordInteraction(Discord.EInteractionCallbackType.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT);
        interaction.data = {
            choices: options
        }
        return interaction;
    }
    static createBasicInteraction(message?: string): DiscordInteraction {
        var interaction = new DiscordInteraction(Discord.EInteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE);
        let dm = interaction.createMessage(message);
        return interaction;
    }
    static createBasicErrorInteraction(errorMessage: string, errorTitle:string = null) {
        var interaction = new DiscordInteraction(Discord.EInteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE);
        const message = interaction.createMessage();
        message.addEmbed({
            title: errorTitle,
            description: errorMessage
        })
        return interaction;
        // builder.pushEmbed(embed);
        // return builder.getDiscordMessage();
    }
}

// TODO: Implement action rows
export class ActionRow implements Discord.IComponent {
    type: Discord.EComponentType = Discord.EComponentType.ACTION_ROW;

    addComponent(component: Discord.IComponent) {

    }
}

export class DiscordMessage implements Discord.IMessage {
    id: string;
    channel_id: number;
    author: Discord.user;
    content: string;
    timestamp: string;
    edited_timestamp: string;
    tts: boolean;
    mention_everyone: boolean;
    mentions: Discord.user[];
    mention_roles: Discord.IRole[];
    mention_channels?: Discord.IChannelMention[];
    attachments: Discord.IAttachment[];
    embeds: Array<Discord.IEmbed>;
    reactions?: Discord.IReaction;
    nonce?: string | number;
    pinned: boolean;
    webhook_id?: string;
    type: number;
    activity?: Discord.IMessageActivity;
    application?: Discord.IApplication;
    application_id?: string;
    message_reference?: Discord.IMessageReference;
    flags?: number;
    referenced_message?: Discord.IMessage;
    interaction?: Discord.IMessageInteraction;
    thread?: Discord.IChannel;
    components?: Discord.IComponent[];
    sticker_items?: Discord.IMessageSticker;
    stickers?: Discord.ISticker;
    position?: number;

    constructor(content: string, embeds: Discord.IEmbed[] = null) {
        this.content = content;
        this.embeds = embeds;
    }

    addEmbed(embed: Discord.IEmbed): DiscordMessage {
        if (this.embeds == null) {
            this.embeds = new Array<Discord.IEmbed>();
        }
        this.embeds.push(embed);

        return this;
    }
}

export class DiscordMessageEmbed implements Discord.IEmbed {
    title?: string;
    type?: string;
    description?: string;
    url?: string;
    timestamp?: string;
    color?: number;
    footer?: Discord.IEmbedFooter;
    image?: Discord.IEmbedImage;
    thumbnail?: Discord.IEmbedThumbnail;
    video?: Discord.IEmbedVideo;
    provider?: Discord.IEmbedProvider;
    author?: Discord.IEmbedAuthor;
    fields?: Array<Discord.IEmbedField>;

    addField(field: Discord.IEmbedField): Discord.IEmbed {
        if(!field.name) {
            throw new Error("Field name cant be null or empty");
        }
        if(!field.value) {
            throw new Error("Field value cant be null or empty");
        }

        if (this.fields == null) {
            this.fields = new Array<Discord.IEmbedField>();
        }
        this.fields.push(field);
        return this;
    }
}