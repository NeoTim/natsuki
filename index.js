"use strict";

const Discord = require("discord.js");
const Jimp = require("jimp");

const manual = require("./manual.json");

const natsuki =
{
// Core
	help(message)
	{
		const command = /\S*/.exec(message.content);

		message.channel.send(manual[command] || `The command \`${command}\` is not found.`);
	},

	invite(message)
	{
		message.channel.send("https://discordapp.com/oauth2/authorize?&client_id=410315411695992833&scope=bot&permissions=0");
	},

	ping(message)
	{
		const tick = Date.now();

		message.reply("pong!").then(message => message.edit(`${message.content} ${Date.now() - tick} ms`));
	},

	support(message)
	{
		message.channel.send("Looking for support?  Natsuki is free and open-source software.  Report issues or even contribute to our GitHub repository!\nhttps://github.com/yurigang/natsuki");
	},

// Fun
	beat(message)
	{
		message.channel.send(`<:buffsuki:403658386723307521> **I'll beat the shit out of ${message.content || "my dad"}.**`);
	},

	cupcake(message)
	{
		const user = message.mentions.users.first() || message.author;
		const text = `${user} has been turned into a cupcake.  IT LOOKS SO CUUUUTE!`;
		const image = Jimp.read("assets/290px-Hostess-Cupcake-Whole.jpg");
		const avatar = Jimp.read(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`);

		image.then(async image => image.composite(await avatar, 80, 80).getBuffer("image/png", (error, buffer) =>
			message.channel.send(text, new Discord.Attachment(buffer, "cupcake.png"))));
	},

	cute(message)
	{
		const append = (duration, string) => async message =>
		{
			await new Promise(resolve => setTimeout(resolve, duration));
			return message.edit(message.content + string);
		}

		message.reply("don't say this embarassing thing, dummy!")
			.then(append(3000, "\nY-You t-too...."))
			.then(append(2000, "\nI'M NOT CUUUUUUUUUUUTE!"))
			.then(append(2000, "\nDon't think you can make me say this embarassing thing just because we're not at school!"))
			.then(append(4000, "\nI-I have to go to the bathroom."));
	},

	hug(message)
	{
		message.channel.send(`${message.author} hugged ${message.content || "Yuri"}!
https://cdn.discordapp.com/attachments/403697175948820481/413015715273113601/Nxdr0qO_1.jpg`);
	},

	kiss(message)
	{
		message.channel.send(`${message.author} kissed ${message.content || "Natsuki"}!
https://cdn.discordapp.com/attachments/403697175948820481/413015768368939009/orIQN4giQx8ijyQ6Qm1vf6Q6uWrLxQ9Fom_Xkht7WOI.jpg`);
	},

	nut(message)
	{
		message.channel.send(`${message.author} nuts on ${message.content || "the floor"}.
<:pukesuki:405984820674428928> **You guys are so gross!**`);
	},

	shelf(message)
	{
		const user = message.mentions.users.first() || message.author;

		message.channel.send(`**Fucking ${user}${user.username[0].repeat(5 + 10 * Math.random())}**`);
	},
};

const client = new Discord.Client();

client.on("ready", () => client.user.setPresence({ game: { name: "n.help | n.invite" }}));

client.on("message", message =>
{
	const match = /^n\.(\S*)\s*(.*)/.exec(message.content);

	if (match) {
		message.content = match[2];
		(natsuki[match[1]] || (() => {}))(message);
	}
});

client.login(process.env.TOKEN);
