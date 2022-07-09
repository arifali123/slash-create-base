import { Client, Intents } from "discord.js";
import { join } from "path";
import { GatewayServer, SlashCreator } from "slash-create";
process.env.NODE_ENV !== "production" ? require("dotenv").config() : null;
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BOT_TOKEN: string;
      NODE_ENV: string;
      CLIENT_ID: string;
      PUBLIC_KEY: string;
      GUILD_IDS: string;
    }
  }
}
const client = new Client({ intents: new Intents(32767) });
const slash = new SlashCreator({
  publicKey: process.env.PUBLIC_KEY,
  applicationID: process.env.CLIENT_ID,
  client,
  token: process.env.BOT_TOKEN,
});
slash
  .withServer(
    new GatewayServer((handler) => client.ws.on("INTERACTION_CREATE", handler))
  )
  .registerCommandsIn(join(__dirname, "commands"), [".ts"])
  .syncCommands();

slash.on("synced", () => console.log("Synced commands"));
// slash.on("debug", (msg) => console.log(msg));
client.on("ready", async (client) => {
  client.user?.setActivity({ name: "Your Commands", type: "WATCHING" });
  console.log(
    `Logged in as ${client.user?.tag}\nhttps://discordapp.com/oauth2/authorize?client_id=${client.user?.id}&scope=bot%20applications.commands&permissions=8`
  );
});
client.login(process.env.BOT_TOKEN);
