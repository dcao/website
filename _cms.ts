import lumeCMS from "lume/cms/mod.ts";

const cms = lumeCMS();

cms.document("News", "src:_data/news.yml", [
  {
    name: "news",
    type: "object-list",
    fields: [
      "info: markdown",
      "date: date",
    ],
  },
]);

export default cms;
