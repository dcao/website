import lume from "lume/mod.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import date from "lume/plugins/date.ts";
import picture from "lume/plugins/picture.ts";
import transformImages from "lume/plugins/transform_images.ts";

import anchor from "markdown-it-anchor";
import sidenotePlugin from "./plugins/sidenotes/index.js";

const markdown = {
  options: { typographer: true },
  plugins: [
    [anchor, { permalink: anchor.permalink.headerLink() }],
    sidenotePlugin,
  ],
};
const site = lume({ src: "." }, { markdown });

site.use(tailwindcss());
site.use(date());
site.use(picture());
site.use(transformImages());

site.add("css/style.css");

// Add static resources
site.add("static");
site.add("img");

// Add blog resources.
site.add([".png", ".jpg", ".jpeg", ".mp4"]);

export default site;
