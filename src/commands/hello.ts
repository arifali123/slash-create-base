import {
  ApplicationCommandType,
  CommandContext,
  SlashCommand,
  SlashCreator,
  MessageOptions,
} from "slash-create";
process.env.NODE_ENV !== "production" ? require("dotenv").config() : null;
export default class HelloCommand extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: "hello",
      description: "Says Hello!",
      // put the guilds you want this command to register in
      guildIDs: process.env.GUILD_IDS.split(","),
      defaultPermission: true,
      type: ApplicationCommandType.CHAT_INPUT,
    });
    this.filePath = __filename;
  }
  async run(ctx: CommandContext): Promise<MessageOptions> {
    return { content: `Hello! <@${ctx.user.id}>` };
  }
}
