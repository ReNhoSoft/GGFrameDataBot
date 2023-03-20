import { DiscordBot } from "./discordBot/discordBot.js";
import { importx,dirname, isESM } from "@discordx/importer";
import * as path from 'path'
import { ELogLevel, RHLogger } from "./helpers/rhlogger.js";

RHLogger.setLogLevel(ELogLevel.debug);

// Load command folder to trigger decorators
const folder = isESM ? dirname(import.meta.url) : __dirname;
process.env["executionFolder"] = folder;
await importx (`${folder}/commands/**.js`);

//Initialize bot
const bot = new DiscordBot();
await bot.init();

// NOTE - Uncomment one of these only when modifying or creating new commands
//await bot.registerCommands();
//await bot.registerGlobalCommands();



async function handler(event: any) {
    let res = await bot.messageHandler(event);
    return res;
}

export { handler }