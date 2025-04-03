const {SlashCommandBuilder,SlashCommandStringOption,Collection} = require('discord.js');
let s = new SlashCommandStringOption().setName('cmd').setDescription('enter cmd').setRequired(true);
const _commands = [
    new SlashCommandBuilder().setName('run').setDescription('run').addStringOption(s)
];
let commands = new Collection();
for (var a of _commands) {
    commands.set(a.name,a);
};
module.exports = {commands};
