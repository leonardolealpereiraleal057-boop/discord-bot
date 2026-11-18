const {
  Client,
  GatewayIntentBits,
  ChannelType
} = require("discord.js");

const {
  joinVoiceChannel,
  VoiceConnectionStatus,
  entersState
} = require("@discordjs/voice");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.once("ready", async () => {
  console.log(`Bot online: ${client.user.tag}`);

  try {
    const guild = await client.guilds.fetch(process.env.GUILD_ID);
    const channel = await guild.channels.fetch(process.env.CHANNEL_ID);

    if (!channel || channel.type !== ChannelType.GuildVoice) {
      throw new Error("Canal de voz não encontrado");
    }

    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
      selfDeaf: true
    });

    await entersState(connection, VoiceConnectionStatus.Ready, 30000);

    console.log("Bot conectado na call!");
  } catch (error) {
    console.error(error);
  }
});

client.login(process.env.DISCORD_TOKEN);