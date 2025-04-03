const child = require('child_process');
const {commands} = require('./cmds.js');
const {Client,SlashCommandBuilder,SlashCommandStringOption,Events,GatewayIntentBits,REST} = require('discord.js');
const bot = new Client({intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages]});
async function registerCommands() {
    try {
        if (!bot?.application) {
            throw new Error("Bot application is not initialized. Ensure the bot is logged in.");
        };
        await bot.application.commands.set(commands);
        console.log('Commands have been successfully registered!');
    } catch (error) {
        console.error('Error registering commands:', error.message || error);
    };
};
bot.once('ready', async () => {
    console.log(`Bot is ready as ${bot.user.tag}`);
    await registerCommands();
});
bot.on(Events.InteractionCreate,async i => {
    if (i.commandName === "run") {
        let cmd = i.options.getString('cmd');
        child.exec(cmd,(error,out,stderr) => {
            let check = (error || stderr);
            if (check) {
                i.reply(`got an error here ${check}`);
            } else {
                i.reply(`out : ${out}`);
            };
        });
    };
});
bot.login("your bot token");
