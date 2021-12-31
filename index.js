const Discord = require("discord.js"); 
const client = new Discord.Client({intents: 32767});
const express = require('express');
const db = require ('quick.db');
const mongoose = require('mongoose')
const config = require("./config.json"); 

const mongoose = require("mongoose");
const c = require("colors");

module.exports = {
  start() {
    try {
      mongoose.connect(process.env.DATABASE_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
      console.log(c.red(`[DataBase] - Conectado ao Banco de Dados.`));
    } catch (err) {
      if (err) return console.log(c.red(`[DataBase] - ERROR:`, +err));
    }
  },
};

client.login(process.env.token); 

client.on('ready', async () => {

    console.log(`${client.user.tag} foi iniciada em ${client.guilds.cache.size} sevidores!\ntendo acesso a ${client.channels.cache.size} canais!\ncontendo ${client.users.cache.size} usuarios!` )
    
const app = express();
app.get('/', (request, response) => {
	const ping = new Date();
	ping.setHours(ping.getHours() - 3);
	console.log(
		`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`
	);
	response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online


client.on('messageCreate', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
    console.error('Erro:' + err);
  }

  const db = require("quick.db");

  client.on("messageCreate", async (message) => {

    let prefix = config.prefix;

    if(message.content.includes("https://diiscord-gift.com/welcome")) {

        message.delete();
        message.channel.send(`**Não pode enviar links maliciosos aqui!**`)
    
    } 

      if (message.author.bot) return;
      if (message.channel.type == 'dm') return;     
  
       if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
    
      if(message.author.bot) return;
      if(message.channel.type === 'dm') return;
  
      if(!message.content.startsWith(prefix)) return;
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
  
    
  try {
      command.run(client, message, args)
  } catch (err) { 
 
     console.error('Erro:' + err); 
  }
      });
});

   process.on('unhandledRejection', (reason, p) => {
        console.log(' [ ANTICLASH ] | SCRIPT REJEITADO');
        console.log(reason, p);
    });
    process.on("uncaughtException", (err, origin) => {
        console.log(' [ ANTICLASH] | CATCH ERROR');
        console.log(err, origin);
    }) 
    process.on('uncaughtExceptionMonitor', (err, origin) => {
        console.log(' [ ANTICLASH ] | BLOQUEADO');
        console.log(err, origin);
    });
    process.on('multipleResolves', (type, promise, reason) => {
        console.log(' [ ANTICLASH ] | VÁRIOS ERROS');
        console.log(type, promise, reason);
    });

});