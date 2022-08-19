import { FrameToFrame, createEvent } from "../../../core/client/client.js";
import { segment } from "oicq";

export const rule = {
  character_img: {
    reg: "#图文字",
    priority: 700,
    describe: "图文字",
  },
};

export async function character_img(e) {
  let event = await createEvent(e);
  if (event.imageList.length || event.quote.imageList.length) {
    FrameToFrame({
      _package: "character_img",
      _handler: "create",
      params: {
        event,
      },
      onData: (error, response) => {
        if (error) {
          console.error(error.stack);
        } else {
          e.reply(segment.image(response.image));
        }
      },
    });
  } else {
    e.reply("需要带图片！");
  }
  return true;
}