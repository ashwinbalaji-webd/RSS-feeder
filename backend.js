`use strict`;
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

// rss parser
import Parser from "rss-parser";

const app = express();
const config = process.env;
const parser = new Parser();
// console.log(process.env)

app.listen(config.PORT, () => {
  console.log(`Server is running on http://localhost:${config.PORT}`);
});

// middlewares
const corsOption = {
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
};
app.use(cors(corsOption));
app.use(bodyParser.json());

const rssFeeds = [
  "https://static.cricinfo.com/rss/livescores.xml",
  "http://rss.news.yahoo.com/rss/topstories",
  "http://msdn.microsoft.com/rss.xml",
  "http://www.infoworld.com/rss/news.rdf",
  "http://rss.pcworld.com/rss/latestnews.rss",
  "http://rssnewsapps.ziffdavis.com/tech.xml",
];

app.get("/", async (_, res) => {
  try {
    let feed = await parser.parseURL(rssFeeds[0]);

    res.setHeader("Content-type", "application/json");
    // console.log(feed);
    res.status(200).json({ success: true, data: feed });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
