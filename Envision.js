const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require("./config.json");

bot.on("message", message => {
    
    console.log(`${message.member.user.username}:${message.content}| at ${message.createdAt}`);

    if (message.content.startsWith("Envision,")) {
        let yesno = Math.floor(Math.random() * 2);
        if (yesno === 1) {
            message.channel.sendMessage("Yes.");
        }
        if (yesno === 0) {
            message.channel.sendMessage("No.");
        }
    }

    if(!message.content.startsWith(config.prefix)) return;
        
    let command = message.content.split(" ")[0];
    command = command.slice(config.prefix.length);
    
    let args = message.content.split(" ").slice(1);
    
    if (command === 'embed') {
        message.channel.sendMessage("", {embed: {
            color: 3447003,
            author: {
                name: bot.user.username,
                icon_url: bot.user.avatarURL
            },
            title: 'This is an embed',
            url: 'http://google.com',
            description: 'This is a test embed to showcase what they look like and what they can do.',
            fields: [
                {
                    name: 'Fields',
                    value: 'They can have different fields with small headlines.'
                },
                {
                name: 'Masked links',
                value: 'You can put [masked links](http://google.com) inside of rich embeds.'
                },
                {
                name: 'Markdown',
                value: 'You can put all the *usual* **__Markdown__** inside of them.'
                }
            ],
            timestamp: new Date(),
            footer: {
                icon_url: bot.user.avatarURL,
                text: '© Example'
            }
        }});
  }

    if (command === "purge") {

        let adminRole = message.guild.roles.find("name", config.adminrole);
        if(message.member.roles.has(adminRole.id)) {

            let numberToDelete = parseInt(args[0]);
            if (!numberToDelete || numberToDelete<0) {
                message.channel.sendMessage("That is not a valid number!");
                return;
            }
            message.channel.bulkDelete(numberToDelete);

        }

        else {
            message.channel.sendMessage(`I'm sorry ${message.member.user}, you don't have that permission!`);
        }
    }

    if (command === "quote") {
        let originalMessage = message
        let channels = message.channel;
        channels.fetchMessage(args[0]).then(message => {
            message.channel.sendMessage("", {
                    embed: {
                        color: 12245589,
                        author: {
                            name: message.member.user.username,
                            icon_url: message.member.user.avatarURL
                        },
                        title: `Quote`,
                        description: message.content,
                        timestamp: new Date(),
                        footer: {
                            icon_url: originalMessage.member.user.avatarURL,
                            text: originalMessage.member.user.username
                        }
                    }
                });
                originalMessage.delete();
        }
        );
    }

    if (command === "announce") {
        let adminRole = message.guild.roles.find("name", config.adminrole);
        if(message.member.roles.has(adminRole.id)) {

            let title = message.content.split("|")[0].slice(config.prefix.length+8);
            let channelToSendMessage = message.guild.channels.find("name", message.content.split("|")[1]);
            let color = parseInt(message.content.split("|")[2]);
            let content = message.content.split("|")[3];

            if (!channelToSendMessage) {
                message.channel.sendMessage("Please specify a real channel.");
                return;
            }
            if (color>16777215 || color<0 || !color) {
                message.channel.sendMessage("The number you have entered does not correspond to a real color. Please ensure it is less than 16777215, and is positive.");
                return;
            }
            
            channelToSendMessage.sendMessage("Announcement:", {
                embed: {
                    color: color,
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL
                        },
                    title: title,
                    description: content,
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.member.user.avatarURL,
                        text: message.member.user.username
                        }
                    }
                });
        
        }

        else {
            message.channel.sendMessage(`I'm sorry ${message.member.user}, you don't have that permission!`);
        }

    }

    if (command === "info") {
        let message1 = message;
        message.channel.sendMessage("Pinging").then(message => {
                    message.edit("", {
                embed: {
                    color: 987,
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL
                        },
                    title: "Envision Information",
                    description: "Main Info Page for Envision.",
                    fields: [
                        {
                            name: 'Current Heartbeat Ping',
                            value: bot.ping,
                            inline: true
                        },
                        {
                            name: 'Admin Commands',
                            value: 'todo',
                            inline: true
                        },
                        {
                            name: 'Commands',
                            value: 'todo',
                            inline: true
                        },
                        {
                            name: 'Roundtrip Time',
                            value: `${message.createdTimestamp-message1.createdTimestamp} milliseconds.`
                        }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: bot.user.avatarURL,
                        text: `Online for ${message.createdTimestamp-bot.readyTimestamp} milliseconds.`
                        }
                    }
                });
                });
    }

    if (command === "rules") {
        
        message.channel.sendMessage("", {
                    embed: {
                        color: 12245589,
                        author: {
                            name: "A friendly reminder from the Admins ;)",
                            icon_url: bot.user.avatarURL
                        },
                        title: `Rules`,
                        description: config.rules,
                        timestamp: new Date(),
                        footer: {
                            icon_url: message.member.user.avatarURL,
                            text: message.member.user.username
                        }
                    }
                });
    }

    if (command === "add") {
      let numArray = args.map(n=> parseFloat(n));
      let total = numArray.reduce( (p, c) => p+c);
      message.channel.sendMessage(total);
    }

    if (command === "mult") {
      let numArray = args.map(n=> parseFloat(n));
      let total = numArray.reduce( (p, c) => p*c);
      message.channel.sendMessage(total);
    }

    if (command === "div") {
      let numArray = args.map(n=> parseFloat(n));
      let total = numArray.reduce( (p, c) => p/c);
      message.channel.sendMessage(total);
    }

    if (command === "mod") {
      let numArray = args.map(n=> parseFloat(n));
      let total = numArray.reduce( (p, c) => p%c);
      message.channel.sendMessage(total);
    }

    if (command === "thingy") {
        message.channel.sendMessage("", {
                    embed: {
                        color: 3447003,
                        author: {
                            name: bot.user.username,
                            icon_url: bot.user.avatarURL
                        },
                        title: `title`,
                        description: `description`,
                        timestamp: new Date(),
                        footer: {
                            icon_url: bot.user.avatarURL,
                            text: bot.user.username
                        }
                    }
                });
    }

    if (command === "mute") {

        let adminRole = message.guild.roles.find("name", config.adminrole);
        if(message.member.roles.has(adminRole.id)) {

            let userToMute = message.mentions.users.first();
            if(!userToMute) {
               return message.reply("Please specify a (real) user to mute!");
            };   
            let mutedUser = message.guild.member(userToMute);
            let guild = mutedUser.guild;
            let roleUser = guild.roles.find("name", "muted");
            mutedUser.addRole(roleUser);
            message.reply(`${userToMute} has been muted!`)
            console.log(`${userToMute.username} has been muted by ${message.member.user.username}`);
        }

        else {
            message.channel.sendMessage(`I'm sorry ${message.member.user}, you don't have that permission!`);
        }
    }

    if (command === "infos") {

        let adminRole = message.guild.roles.find("name", config.adminrole);
        if(message.member.roles.has(adminRole.id)) {
            
            let userToLook = message.mentions.users.first();
            if(!userToLook) {
                return message.reply("Please specify a (real) user to look at!");
            }
            console.log(userToLook);
            console.log(message);
        }

        else {
            message.channel.sendMessage(`I'm sorry ${message.member.user}, you don't have that permission!`);
        }
        
    }

    if (command === "kill") {

        let adminRole = message.guild.roles.find("name", config.adminrole);
        if(message.member.roles.has(adminRole.id)) {
            
            let userToLook = message.mentions.users.first();
            if(!userToLook) {
                return message.reply("Please specify a (real) user to look at!");
            }
            message.reply(`Dispatching drone to ${userToLook.username}'s location. Please stand by.`)
        }

        else {
            message.channel.sendMessage(`I'm sorry ${message.member.user}, you don't have that permission!`);
        }
        
    }

    if (command === "unmute") {
        
        let adminRole = message.guild.roles.find("name", config.adminrole);
        if(message.member.roles.has(adminRole.id)) {

            let userToMute = message.mentions.users.first();
            if(!userToMute) {
               return message.reply("Please specify a (real) user to unmute!");
            }
            let mutedUser = message.guild.member(userToMute);
            let guild = mutedUser.guild;
            let roleUser = guild.roles.find("name", "muted");
            mutedUser.removeRole(roleUser);
            message.reply(`${userToMute} has been unmuted!`)
            console.log(`${userToMute.username} has been unmuted by ${message.member.user.username}`);
        }

        else {
            message.channel.sendMessage(`I'm sorry ${message.member.user}, you don't have that permission!`);
        }

    }

    if (command === "warmap") {
        message.channel.sendFile('Envisionmap.png', 'Envisionmap.png', "War Map:");
    }

    if (command === "map") {
        message.channel.sendFile('NormalMap.png', 'NormalMap.png', "Map:");
    }
    if (command === "thread") {
        message.reply("Here is the link: https://forum.nationstates.net/viewtopic.php?f=5&t=389880");
    }
});

bot.on("guildMemberAdd", member => {
    let guild = member.guild;
    let roleUser = guild.roles.find("name", "@user");
    member.addRole(roleUser);
    guild.defaultChannel.sendMessage(`Welcome ${member.user} to the ${member.guild} Discord!`)
});

bot.on('error', e => { console.error(e); });

bot.on('ready', () => {
  console.log('I am ready!');
  let guild = bot.guilds.get("243530171976646657");
  bot.user.setGame("Surveillance Footage")
});

bot.login(config.token);
