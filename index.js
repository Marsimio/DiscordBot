const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions
  ],
});
const prefix = 'da!';
const starwalkerEmoji = '<a:Original______Starwalker:889728018728251412>'
const dogImageUrl = 'https://media.discordapp.net/attachments/728955330234417232/952751896983113758/IMG_2709.jpg';
const deezImageUrl = 'https://cdn.discordapp.com/attachments/769177329711972362/1150881754215886919/aubrey-omori.gif';
const gupImageUrl = 'https://cdn.discordapp.com/attachments/456504224759545857/1150880936997691463/unexpected-unexpected-gup.gif';
const fortniteEmoji = '<a:Raindance:1020167182920978462>'
const nerdEmoji = '<a:BananuBaker:774807885276119060>'
const validDiceTypes = ['dodge', 'block', 'counter', 'buff', 'heal', 'status'];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);

  client.user.setActivity({
    name: 'da!help'
  })
});


client.on('messageCreate', (message) => {
  
  const content = message.content.toLowerCase();

   //Zejza Commands

  if (message.author.id === '495253578277978123') {
    console.log(`Nigel has been gooned`)
    message.react(nerdEmoji).catch(console.error);
  }

  if (content.includes('deez') && message.channel.id === '769177329711972362') {
    message.channel.send({
      files: [deezImageUrl],
    });
  }

  if (content.includes(':3') && !message.author.bot && message.channel.id === '769177329711972362') {
    message.channel.send(':3');
  }

  if (content.includes('gup') && message.channel.id === '769177329711972362') {
    message.channel.send({
      files: [gupImageUrl],
    });
  }

  //Deltahub Commands

  if (content.includes('fortnite') && message.channel.id === '769177329711972362') {
    console.log(`${message.author.tag} has been fortnite`)
    message.react(fortniteEmoji).catch(console.error);
  }

  if (message.content.toLowerCase() === '!sneepy') {
    message.channel.send({
      files: [dogImageUrl],
    });
  }

  if (content.includes('starwalker') || content.includes('s t a r w a l k e r') || content.includes('star walker')) {
    console.log(`${message.author.tag} has been starwalker'd`)
    message.react(starwalkerEmoji).catch(console.error);
  }

  //Prefix Messages

  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

  if (command === 'help' && !message.author.bot) {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Bot Commands')
      .addFields(
      { name: 'da!help', value: 'Display this help message' },
      { name: 'da!sneepy', value: 'Show a sneepy dog image' },
      { name: 'da!dice', value: 'Shows dice options' }
    );
    message.channel.send({ embeds: [embed] });
  } else if (command === 'dice' && !message.author.bot) {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Dice Commands')
      .setDescription('Use different dice commands for various effects.')
      .addFields(
      { name: 'da!dodge', value: 'Roll a dice to determine the outcome of your dodge attempt.' },
      { name: 'da!block', value: 'Roll a dice to determine the outcome of your block attempt.' },
      { name: 'da!counter', value: 'Roll a dice to determine the outcome of your counter attempt.' },
      { name: 'da!buff', value: 'Roll a dice to determine the effectiveness of your buff or heal.' },
      { name: 'da!status', value: 'Roll a dice to determine if a status effect is successful.' }
    );
    message.reply({ embeds: [embed] });
  } else if (validDiceTypes.includes(command)) {
    const result = `${rollDice(command)}`;
      const messageText = getResultMessage(command, result);
      message.reply(messageText);
  } else if (command === 'sneepy') {
    message.reply({
      files: [dogImageUrl],
      });
    }
  }
});

function rollDice(diceType) {
  let max;

  switch (diceType) {
    case 'dodge':
    case 'block':
    case 'counter':
    case 'buff':
    case 'heal':
      max = 20;
      break;
    case 'status':
      max = 6;
      break;
    default:
      return -1;
  }

  return Math.floor(Math.random() * (max)) + 1;
}

function getResultMessage(diceType, result) {
  switch (diceType) {
    case 'dodge':
      if (result >= 14) return `You successfully dodged the attack with a roll of ${result}!`;
      if (result >= 10) return `You partially dodged the attack with a roll of ${result}. You take reduced damage.`;
      if (result >= 6) return `You grazed the attack with a roll of ${result}. You take minimal damage.`;
      return `You failed to dodge with a roll of ${result}. You take major damage.`;
      
    case 'block':
      if (result >= 14) return `You successfully blocked the attack with a roll of ${result}!`;
      if (result >= 10) return `You partially blocked the attack with a roll of ${result}. You take reduced damage.`;
      if (result >= 6) return `You grazed the attack with a roll of ${result}. You take minimal damage.`;
      return `You failed to block with a roll of ${result}. You take major damage.`;

    case 'counter':
      if (result == 20) {
        const imageUrl = 'https://cdn.discordapp.com/attachments/456504224759545857/1149450120782418020/image.png';
        const messageText = `You countered the attack with a perfect roll of ${result}! The attacker takes extra damage.\n${imageUrl}`;
        return messageText;
      }  
      if (result >= 17) return `You countered the attack strongly with a roll of ${result}. You take no damage.`;   
      if (result >= 13) return `You countered the attack with a roll of ${result}. You take minimal damage.`;
      if (result >= 6) return `You countered the attack weakly with a roll of ${result} and take normal damage.`;
      return `You failed to counter with a roll of ${result}. You take extra damage and are stunned.`;

    case 'buff':
    case 'heal':
      if (result == 20) return `Your ${diceType} was incredibly effective with a roll of ${result}!`;
      if (result >= 10) return `Your ${diceType} was moderately effective with a roll of ${result}.`;
      return `Your ${diceType} had limited effect with a roll of ${result}.`;

    case 'status':
      return result <= 3
        ? `The status effect succeeded with a roll of ${result}. You are affected.`
        : `The status effect failed with a roll of ${result}. You are not affected.`;

    default:
      return 'Invalid dice type.';
  }
}

client.login('OTE4OTM0NTY0Mjc2MTUwMjky.GYKMaS.0yJCExa0OSGfb0gt2Zjcqc5NMjpkn3ncdmAO1U')