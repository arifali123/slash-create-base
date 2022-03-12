import {
  ApplicationCommandType,
  Command,
  CommandContext,
  MessageOptions,
  SlashCreator,
} from "slash-create";
process.env.NODE_ENV !== "production" ? require("dotenv").config() : null;
export default class ReverseCommand extends Command {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: "reverse",
      description: "Reverses Text",
      defaultPermission: true,
      type: ApplicationCommandType.MESSAGE,
      guildIDs: process.env.GUILD_IDS.split(","),
    });
  }
  async run(ctx: CommandContext): Promise<MessageOptions> {
    return { content: ctx.targetMessage!.content.split("").reverse().join("") };
  }
}
