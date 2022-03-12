import {
  ApplicationCommandType,
  Command,
  CommandContext,
  MessageOptions,
  SlashCreator,
} from "slash-create";
process.env.NODE_ENV !== "production" ? require("dotenv").config() : null;
export default class AvatarCommand extends Command {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: "avatar",
      description: "Sends user avatar in embed",
      defaultPermission: true,
      type: ApplicationCommandType.USER,
      guildIDs: process.env.GUILD_IDS.split(","),
    });
  }
  async run(ctx: CommandContext): Promise<MessageOptions> {
    return {
      embeds: [
        {
          image: { url: ctx.targetUser!.avatarURL },
          color: 25764,
          title: `${ctx.targetUser!.username}#${
            ctx.targetUser!.discriminator
          }'s Avatar`,
        },
      ],
    };
  }
}
