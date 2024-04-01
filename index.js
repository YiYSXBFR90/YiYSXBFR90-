const { Client, Intents, MessageEmbed } = require('discord.js');

const express = require("express");
const app = express();

app.listen(() => console.log("Bot Restart"));

app.get("/", (req, res) => {
  res.send("POWER")
})

app.use('/ping', (req, res) => {
  res.send(new Date());
});


const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


client.once('ready', () => {
  console.log(`Bot logged in as ${client.user.tag}`);
  console.log(`Bot Is In ${client.guilds.cache.size} Server`);
});
//______________________________//
const USER_ID_TO_MONITOR = "282859044593598464";///حط هنا أيدي برو بوت
//______________________________//
client.on('messageCreate', async (message) => {

  if (message.author.id === USER_ID_TO_MONITOR) {

    const newMessage = {
      content: message.content || '\u200B', 
      embeds: message.embeds.map((embed) => new MessageEmbed(embed)),
      files: message.attachments.map((attachment) => attachment),
    };


    try {
      await Promise.all([
        message.delete(),
        message.channel.send(newMessage),
      ]);
    } catch (err) {
      console.error('Error while deleting or resending message:', err);
    }
  }
    if (message.author.id === client.user.id && message.content.includes("type these numbers to confirm")) {

    setTimeout(() => {
      message.delete().catch((err) => console.error('Error while deleting message:', err));
    }, 10000); 
  } else if (message.author.id === client.user.id && message.content.includes("Cool down")) {

    setTimeout(() => {
      message.delete().catch((err) => console.error('Error while deleting message:', err));
    }, 2000); 
  }
});

client.login(process.env.token);