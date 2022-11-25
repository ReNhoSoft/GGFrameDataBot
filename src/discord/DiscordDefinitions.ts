namespace Discord {
    export interface IThreadMetadata {
        //	whether the thread is archived
        archived: boolean;
        //	duration in minutes to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080
        auto_archive_duration: number;
        //	ISO8601 timestamp	timestamp when the thread's archive status was last changed, used for calculating recent activity
        archive_timestamp: string;
        //	whether the thread is locked; when a thread is locked, only users with MANAGE_THREADS can unarchive it
        locked: boolean;
        //	whether non-moderators can add other non-moderators to a thread; only available on private threads
        invitable?: boolean;
        //	ISO8601 timestamp	timestamp when the thread was created; only populated for threads created after 2022-01-09
        create_timestamp?: string;
    }
    export interface IThreadMember {
        //	the id of the thread
        id?: string;
        //	the id of the user
        user_id?: string;
        //	ISO8601 timestamp	the time the current user last joined the thread
        join_timestamp: string;
        //	any user-thread settings, currently only used for notifications
        flags: number;
    }

    export interface IChannel {
        //	the id of this channel
        id: string;
        //	the type of channel
        type: number;
        //	the id of the guild (may be missing for some channel objects received over gateway guild dispatches)
        guild_id?: string;
        //	sorting position of the channel
        position?: number;
        // TODO: Verify what kind of object goes here
        // objects	explicit permission overwrites for members and roles
        permission_overwrites?: any;
        //	the name of the channel (1-100 characters)
        name?: string;
        //	the channel topic (0-1024 characters)
        topic?: string;
        //	whether the channel is nsfw
        nsfw?: boolean;
        //the id of the last message sent in this channel (or thread for GUILD_FORUM channels) (may not point to an existing or valid message or thread)
        last_message_id?: string;
        //	the bitrate (in bits) of the voice channel
        bitrate?: number;
        //	the user limit of the voice channel
        user_limit?: number;
        //	amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission manage_messages or manage_channel, are unaffected
        rate_limit_per_user?: number;
        //	the recipients of the DM
        recipients?: user[];
        //	icon hash of the group DM
        icon?: string;
        //	id of the creator of the group DM or thread
        owner_id?: string;
        //	application id of the group DM creator if it is bot-created
        application_id?: string;
        //  for guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created
        parent_id?: string;
        //  ISO8601 timestamp	when the last pinned message was pinned. This may be null in events such as GUILD_CREATE when a message is not pinned.
        last_pin_timestamp?: string;
        //	voice region id for the voice channel, automatic when set to null
        rtc_region?: string;
        //	the camera video quality mode of the voice channel, 1 when not present
        video_quality_mode?: number;
        //	number of messages (not including the initial message or deleted messages) in a thread (if the thread was created before July 1, 2022, it stops counting at 50)
        message_count?: number;
        //  an approximate count of users in a thread, stops counting at 50
        member_count?: number;
        //	thread-specific fields not needed by other channels
        thread_metadata?: IThreadMetadata;
        //	thread member object for the current user, if they have joined the thread, only included on certain API endpoints
        member?: IThreadMember;
        //	default duration that the clients (not the API) will use for newly created threads, in minutes, to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080
        default_auto_archive_duration?: number;
        //	computed permissions for the invoking user in the channel, including overwrites, only included when part of the resolved data received on a slash command interaction
        permissions?: string;
        //	channel flags combined as a bitfield
        flags?: number;
        //	number of messages ever sent in a thread, it's similar to message_count on message creation, but will not decrement the number when a message is deleted
        total_message_sent?: number;
    }

    export interface IOverwrite {
        //	role or user id
        id: string;
        //	either 0 (role) or 1 (member)
        type: number;
        //	permission bit set
        allow: string;
        //	permission bit set
        deny: string;
    }

    export interface IRole {
        //	role id
        id: string;
        //	role name
        name: string;
        //	integer representation of hexadecimal color code
        color: number;
        //	if this role is pinned in the user listing
        hoist: boolean;
        //	role icon hash
        icon?: string;
        //	role unicode emoji
        unicode_emoji?: string;
        //	position of this role
        position: number;
        //	permission bit set
        permissions: string;
        //	whether this role is managed by an integration
        managed: boolean;
        //	whether this role is mentionable
        mentionable: boolean;
        // tags object	the tags this role has
        tags?: IRoleTags;
    }

    export interface IRoleTags {
        //	the id of the bot this role belongs to
        bot_id?: string;
        //	the id of the integration this role belongs to
        integration_id?: string;
        //	whether this is the guild's premium subscriber role
        premium_subscriber?: any;
    }

    export interface IChannelMention {
        //  id of the channel
        id: string;
        //	id of the guild containing the channel
        guild_id: string;
        //	the type of channel
        type: number;
        //	the name of the channel
        name: string;
    }

    export interface IAttachment {
        // 	attachment id
        id: string;
        //	name of file attached
        filename: string;
        //	description for the file
        description?: string;
        //	the attachment's media type
        content_type?: string;
        //	size of file in bytes
        size: number;
        //	source url of file
        url: string;
        //	a proxied url of file
        proxy_url: string;
        //  height of file (if image)
        height?: number;
        //	width of file (if image)
        width?: number;
        //	whether this attachment is ephemeral
        ephemeral?: boolean;
    }

    export interface IReaction {
        //	times this emoji has been used to react
        count: number;
        //	whether the current user reacted using this emoji
        me: boolean;
        //	emoji information
        emoji: IEmoji;
    }

    export interface IEmoji {
        //	emoji id
        id: string;
        // (can be null only in reaction emoji objects)	emoji name
        name?: string;
        //	roles allowed to use this emoji
        roles?: IRole[];
        //	user that created this emoji
        user?: user;
        //	whether this emoji must be wrapped in colons
        require_colons?: boolean;
        //	whether this emoji is managed
        managed?: boolean;
        //	whether this emoji is animated
        animated?: boolean;
        //	whether this emoji can be used, may be false due to loss of Server Boosts
        available?: boolean;
    }

    export interface IMessageActivity {
        //	type of message activity
        type: number;
        //	party_id from a Rich Presence event
        party_id?: string;
    }

    export interface IMessageReference {
        //	id of the originating message
        message_id?: string;
        //	id of the originating message's channel
        channel_id?: string;
        //	id of the originating message's guild
        guild_id?: string;
        //	when sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message, default true
        fail_if_not_exists?: boolean;
    }
    export enum EInteractionType {
        PING = 1,
        APPLICATION_COMMAND = 2,
        MESSAGE_COMPONENT = 3,
        APPLICATION_COMMAND_AUTOCOMPLETE = 4,
        MODAL_SUBMIT = 5
    }

    export interface IMessageInteraction {
        //	ID of the interaction
        id: string;
        //	Type of interaction
        type: EInteractionType;
        //	Name of the application command, including subcommands and subcommand groups
        name: string;
        //	User who invoked the interaction
        user: user;
        //	Member who invoked the interaction in the guild
        member?: IMember;
    }

    export interface IMember {
        //	the user this guild member represents
        user?: user;
        //	this user's guild nickname
        nick?: string;
        //	the member's guild avatar hash
        avatar?: string;
        //	array of role object ids
        roles: string[];
        //	ISO8601 timestamp	when the user joined the guild
        joined_at: string;
        //	ISO8601 timestamp	when the user started boosting the guild
        premium_since?: string;
        //	whether the user is deafened in voice channels
        deaf: boolean;
        //	whether the user is muted in voice channels
        mute: boolean;
        //	whether the user has not yet passed the guild's Membership Screening requirements
        pending?: boolean;
        //	total permissions of the member in the channel, including overwrites, returned when in the interaction object
        permissions?: string;
        //ISO8601 timestamp	when the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out
        communication_disabled_until?: string;
    }

    export interface IMessageSticker {
        //	id of the sticker
        id: string;
        //	name of the sticker
        name: string;
        //	type of sticker format
        format_type: number;
    }

    export interface ISticker {
        //	id of the sticker
        id: string;
        //	for standard stickers, id of the pack the sticker is from
        pack_id?: string;
        //	name of the sticker
        name: string;
        //	description of the sticker
        description?: string;
        //	autocomplete/suggestion tags for the sticker (max 200 characters)
        tags: string;
        //	Deprecated previously the sticker asset hash, now an empty string
        asset?: string;
        //	type of sticker
        type: number;
        //	type of sticker format
        format_type: number;
        //	whether this guild sticker can be used, may be false due to loss of Server Boosts
        available?: boolean;
        //	id of the guild that owns this sticker
        guild_id?: string;
        //  the user that uploaded the guild sticker
        user?: user;
        //	the standard sticker's sort order within its pack
        sort_value?: number;
    }

    export class IMessage {
        //	snowflake	id of the message
        id: string;
        //	snowflake	id of the channel the message was sent in
        channel_id: number;
        // object	the author of this message (not guaranteed to be a valid user)
        author: user;
        //	contents of the message
        content: string;
        // timestamp	when this message was sent
        timestamp: string;
        //timestamp	when this message was edited (or null if never)
        edited_timestamp: string;
        //	whether this was a TTS message
        tts: boolean;
        //	whether this message mentions everyone
        mention_everyone: boolean;
        //  users specifically mentioned in the message
        mentions: user[];
        // object ids	roles specifically mentioned in this message
        mention_roles: IRole[];
        //  channels specifically mentioned in this message
        mention_channels?: IChannelMention[];
        //	any attached files
        attachments: IAttachment[]
        // objects	any embedded content
        embeds: IEmbed[];
        // objects	reactions to the message
        reactions?: IReaction;
        //	used for validating a message was sent
        nonce?: number | string;
        //	whether this message is pinned
        pinned: boolean;
        //	if the message is generated by a webhook, this is the webhook's id
        webhook_id?: string;
        //	type of message
        type: number;
        //  sent with Rich Presence-related chat embeds
        activity?: IMessageActivity;
        //	sent with Rich Presence-related chat embeds
        application?: IApplication;
        //	if the message is an Interaction or application-owned webhook, this is the id of the application
        application_id?: string;
        //	data showing the source of a crosspost, channel follow add, pin, or reply message
        message_reference?: IMessageReference;
        //	message flags combined as a bitfield
        flags?: number;
        //	the message associated with the message_reference
        referenced_message?: IMessage;
        //	sent if the message is a response to an Interaction
        interaction?: IMessageInteraction;
        //	the thread that was started from this message, includes thread member object
        thread?: IChannel;
        //	sent if the message contains components like buttons, action rows, or other interactive components
        // TODO: implement typing for components
        components?: IComponent[];
        //  sent if the message contains stickers
        sticker_items?: IMessageSticker;
        //	Deprecated the stickers sent with the message
        stickers?: ISticker;
        //	A generally increasing integer (there may be gaps or duplicates) that represents the approximate position of the message in a thread, it can be used to estimate the relative position of the messsage in a thread in company with total_message_sent on parent thread
        position?: number;
    }


    export interface IEmbedFooter {
        //	footer text
        text: string;
        //	url of footer icon (only supports http(s) and attachments)
        icon_url?: string;
        //	a proxied url of footer icon
        proxy_icon_url?: string;
    }

    export interface IEmbedImage {
        //	source url of image (only supports http(s) and attachments)
        url: string;
        //	a proxied url of the image
        proxy_url?: string;
        //	height of image
        height?: number;
        //	width of image
        width?: number;
    }

    export interface IEmbedThumbnail {
        //	source url of thumbnail (only supports http(s) and attachments)
        url: string;
        //	a proxied url of the thumbnail
        proxy_url?: string;
        //	height of thumbnail
        height?: number;
        //	width of thumbnail
        width?: number;
    }

    export interface IEmbedVideo {
        //	source url of video
        url?: string;
        //	a proxied url of the video
        proxy_url?: string;
        //	height of video
        height?: number;
        //  width of video
        width?: number;
    }

    export interface IEmbedProvider {
        //	name of provider
        name?: string;
        //	url of provider
        url?: string;
    }

    export interface IEmbedAuthor {
        //	name of author
        name: string;
        //	url of author
        url?: string;
        //	url of author icon (only supports http(s) and attachments)
        icon_url?: string;
        //	a proxied url of author icon
        proxy_icon_url?: string;
    }

    export interface IEmbedField {
        //	name of the field
        name: string;
        //	value of the field
        value: string;
        //  whether or not this field should display inline
        inline?: boolean;
    }

    export interface IEmbed {
        //	title of embed
        title?: string;
        //	type of embed (always "rich" for webhook embeds)
        type?: string;
        //	description of embed
        description?: string;
        //	url of embed
        url?: string;
        //	timestamp of embed content
        timestamp?: string;
        //	color code of the embed
        color?: number;
        //  footer information
        footer?: IEmbedFooter;
        //  image information
        image?: IEmbedImage;
        //  thumbnail information
        thumbnail?: IEmbedThumbnail;
        //  video information
        video?: IEmbedVideo;
        //	provider information
        provider?: IEmbedProvider;
        //	author information
        author?: IEmbedAuthor;
        //	fields information
        fields?: IEmbedField[];
    }


    export enum EApplicationCommantType {
        // 	Slash commands; a text-based command that shows up when a user types /
        CHAT_INPUT = 1,
        //	A UI-based command that shows up when you right click or tap on a user
        USER = 2,
        //	A UI-based command that shows up when you right click or tap on a message
        MESSAGE = 3
    }
    export enum EApplicationCommandOptionType {
        SUB_COMMAND = 1,
        SUB_COMMAND_GROUP = 2,
        STRING = 3,
        //	Any integer between -2^53 and 2^53
        INTEGER = 4,
        BOOLEAN = 5,
        USER = 6,
        //	Includes all channel types + categories
        CHANNEL = 7,
        ROLE = 8,
        //	Includes users and roles
        MENTIONABLE = 9,
        //	Any double between -2^53 and 2^53
        NUMBER = 10,
        //	attachment object
        ATTACHMENT = 11
    }
    export interface IApplicationCommandOptionChoice {
        //	1-100 character choice name
        name: string;
        //	?dictionary with keys in available locales	Localization dictionary for the name field. Values follow the same restrictions as name
        name_localizations?: any;
        // Value for the choice, up to 100 characters if string
        value: string | number;
    }

    export enum EChannelType {
        //	a text channel within a server
        GUILD_TEXT = 0,
        //	a direct message between users
        DM = 1,
        // 	a voice channel within a server
        GUILD_VOICE = 2,
        //	a direct message between multiple users
        GROUP_DM = 3,
        //	an organizational category that contains up to 50 channels
        GUILD_CATEGORY = 4,
        //	a channel that users can follow and crosspost into their own server/
        GUILD_NEWS = 5,
        //	a temporary sub-channel within a GUILD_NEWS channel
        GUILD_NEWS_THREAD = 10,
        //	a temporary sub-channel within a GUILD_TEXT channel
        GUILD_PUBLIC_THREAD = 11,
        //	a temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission
        GUILD_PRIVATE_THREAD = 12,
        //	a voice channel for hosting events with an audience
        GUILD_STAGE_VOICE = 13,
        //	the channel in a hub containing the listed servers
        GUILD_DIRECTORY = 14,
        //	(still in development) a channel that can only contain threads
        GUILD_FORUM = 15,
    }

    export interface IApplicationCommandOption {
        //	Type of option
        type: EApplicationCommandOptionType
        //	1-32 character name
        name: string;
        // TODO: Implement localizations interface
        name_localizations?: any;
        //	1-100 character description
        description: string;
        //  ?dictionary with keys in available locales	Localization dictionary for the description field. Values follow the same restrictions as description
        description_localizations?: any;
        //	If the parameter is required or optional--default false
        required?: boolean;
        //	Choices for STRING, INTEGER, and NUMBER types for the user to pick from, max 25
        choices?: IApplicationCommandOptionChoice[];
        //	If the option is a subcommand or subcommand group type, these nested options will be the parameters
        options?: IApplicationCommandOption[];
        // 	If the option is a channel type, the channels shown will be restricted to these types
        channel_types?: EChannelType[];
        //	integer for INTEGER options, double for NUMBER options	If the option is an INTEGER or NUMBER type, the minimum value permitted
        min_value?: number;
        //	integer for INTEGER options, double for NUMBER options	If the option is an INTEGER or NUMBER type, the maximum value permitted
        max_value?: number;
        //	For option type STRING, the minimum allowed length (minimum of 0, maximum of 6000)
        min_length?: number;
        // 	For option type STRING, the maximum allowed length (minimum of 1, maximum of 6000)
        max_length?: number;
        //	If autocomplete interactions are enabled for this STRING, INTEGER, or NUMBER type option
        autocomplete?: boolean;
    }

    export enum EApplicationCommandType {
        //	Slash commands; a text-based command that shows up when a user types /
        CHAT_INPUT=1,
        //	A UI-based command that shows up when you right click or tap on a user
        USER=2,
        //	A UI-based command that shows up when you right click or tap on a message
        MESSAGE=3
    }

    export interface IApplicationCommand {
        //  Unique ID of command	all
        id: string;
        //   type	Type of command, defaults to 1	all
        type: EApplicationCommandType;
        //	ID of the parent application	all
        application_id: string;
        //	guild id of the command, if not global	all
        guild_id?: string;
        //	Name of command, 1-32 characters	all
        name: string;
        //  Dictionary with keys in available locales	Localization dictionary for name field. Values follow the same restrictions as name	all
        name_localizations?: any;
        //	Description for CHAT_INPUT commands, 1-100 characters. Empty string for USER and MESSAGE commands	all
        description: string;
        //	Dictionary with keys in available locales	Localization dictionary for description field. Values follow the same restrictions as description	all
        description_localizations?: any;
        //	Parameters for the command, max of 25	CHAT_INPUT
        options?: IApplicationCommandOption[];
        //	Set of permissions represented as a bit set	all
        default_member_permissions?: string;
        //	Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible.	all
        dm_permission?: boolean;
        // 	Not recommended for use as field will soon be deprecated. Indicates whether the command is enabled by default when the app is added to a guild, defaults to true	all
        default_permission?: boolean;
        //	Autoincrementing version identifier updated during substantial record changes
        version: string;
    }



    export interface user {
        //	the user's id	
        id: string;
        //	the user's username, not unique across the platform	
        username: string;
        //	the user's 4-digit discord-tag	
        discriminator: string;
        //	the user's avatar hash	
        avatar: string;
        //	whether the user belongs to an OAuth2 application	
        bot?: boolean;
        //	whether the user is an Official Discord System user (part of the urgent message system)	
        system?: boolean;
        //	whether the user has two factor enabled on their account
        mfa_enabled?: boolean;
        //	the user's banner hash	
        banner?: string;
        //	the user's banner color encoded as an integer representation of hexadecimal color code	
        accent_color?: number;
        //	the user's chosen language option	
        locale?: string;
        //	whether the email on this account has been verified	
        verified?: boolean;
        //	the user's email	
        email?: string;
        //	the flags on a user's account	
        flags?: number;
        //	the type of Nitro subscription on a user's account	
        premium_type?: number;
        //	the public flags on a user's account	
        public_flags?: number;
    }

    export interface ITeamMember {
        //	the user's membership state on the team
        membership_state: number;
        //	will always be ["*"]
        permissions: string[];
        //	the id of the parent team of which they are a member
        team_id: string;
        //	the avatar, discriminator, id, and username of the user
        user: user;
    }

    export interface ITeam {
        //	a hash of the image of the team's icon
        icon: string;
        //	the unique id of the team
        id: string;
        // objects	the members of the team
        members: ITeamMember;
        //	the name of the team
        name: string;
        //	the user id of the current team owner
        owner_user_id: string;
    }

    export interface IInstallParams {
        //	the scopes to add the application to the server with
        scopes: string[];
        //	the permissions to request for the bot role
        permissions: string;
    }
    export interface IApplication {
        //	the id of the app
        id: string;
        //	the name of the app
        name: string;
        //	the icon hash of the app
        icon: string;
        ///	the description of the app
        description: string;
        //  an array of rpc origin urls, if rpc is enabled
        rpc_origins?: string[];
        //	when false only app owner can join the app's bot to guilds
        bot_public: boolean;
        //	when true the app's bot will only join upon completion of the full oauth2 code grant flow
        bot_require_code_grant: boolean;
        //	the url of the app's terms of service
        terms_of_service_url?: string;
        // 	the url of the app's privacy policy
        privacy_policy_url?: string;
        //	partial user object containing info on the owner of the application
        owner?: user;
        //	the hex encoded key for verification in interactions and the GameSDK's GetTicket
        verify_key: string;
        //	if the application belongs to a team, this will be a list of the members of that team
        team: ITeam;
        //	if this application is a game sold on Discord, this field will be the guild to which it has been linked
        guild_id?: string;
        //	if this application is a game sold on Discord, this field will be the id of the "Game SKU" that is created, if exists
        primary_sku_id?: string;
        // 	if this application is a game sold on Discord, this field will be the URL slug that links to the store page
        slug?: string
        //	the application's default rich presence invite cover image hash
        cover_image?: string;
        //	the application's public flags
        flags?: number;
        //	up to 5 tags describing the content and functionality of the application
        tags?: string[];
        // settings for the application's default in-app authorization link, if enabled
        install_params?:IInstallParams;
        //	the application's default custom authorization link, if enabled;
        custom_install_url?: string;
    }
    
    export enum EInteractionCallbackType {
        /** ACK a Ping */
        PONG=1,
        /**	respond to an interaction with a message */
        CHANNEL_MESSAGE_WITH_SOURCE=4,
        /**	ACK an interaction and edit a response later, the user sees a loading state */
        DEFERRED_CHANNEL_MESSAGE_WITH_SOURC=5,
        /**	for components, ACK an interaction and edit the original message later; the user does not see a loading state */
        DEFERRED_UPDATE_MESSAGE=6,
        /**	for components, edit the message the component was attached to */
        UPDATE_MESSAGE=7,
        /**	respond to an autocomplete interaction with suggested choices */
        APPLICATION_COMMAND_AUTOCOMPLETE_RESULT=8,
        /**	respond to an interaction with a popup modal */
        MODAL=9
    }

    export interface IInteractionResponse {
        //  The type of response
        type: EInteractionCallbackType;
        data?: IMessage | IAutoComplete | IModal;
    }

    export interface IAutoComplete {
        choices: IApplicationCommandOptionChoice[];
    }

    /** Support for components in modals is currently limited to type 4 (Text Input). */
    export interface IModal {
        //	a developer-defined identifier for the component, max 100 characters
        custom_id:string;
        //	the title of the popup modal, max 45 characters
        title:string
        //	between 1 and 5 (inclusive) components that make up the modal
        components: IComponent[];
    }

    export interface IInteractionCallbackData {
        //	is the response TTS
        tts?:boolean;
        //	message content
        content?:string;
        //	supports up to 10 embeds
        embeds?:IEmbed[];
        // allowed mentions object
        allowed_mentions?:EAllowedMentionTypes[];
        //	message flags combined as a bitfield (only SUPPRESS_EMBEDS and EPHEMERAL can be set)
        flags?:	number;

        components?:IComponent[];
        //	attachment objects with filename and description
        attachments?:IAttachment[];
    }

    export enum EAllowedMentionTypes {
        //	Controls role mentions
        ROLE_MENTIONS="roles",
        //	Controls user mentions
        USER_MENTIONS="users",
        //	Controls @everyone and @here mentions
        EVERYONE_MENTIONS="everyone"
    }

    export interface IAllowedMentions {
        //	An array of allowed mention types to parse from the content.
        pars: EAllowedMentionTypes[];
        //	Array of role_ids to mention (Max size of 100)
        roles:string[];
        //  Array of user_ids to mention (Max size of 100)
        users:string[];
        //	For replies, whether to mention the author of the message being replied to (default false)
        replied_user:boolean;
    }

    export enum EComponentType {
        //	A container for other components
        ACTION_ROW = 1,
        //  A button object
	    BUTTON = 2,
        //	A select menu for picking from choices
	    SELECT_MENU = 3,
        // 	A text input object
	    TEXT_INPUT=4
    }

    export interface IComponent {
        type: EComponentType;
    }
}

export { Discord }