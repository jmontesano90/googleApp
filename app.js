const express = require("express");
const morgan = require("morgan");

const apps = require("./playstore.js");

const app = express();
app.use(morgan("common"));

app.get("/apps", (req, res) => {
  const { sort, genres = "" } = req.query;

  if (sort) {
    if (!["rating", "app"].includes(sort)) {
      return res.status(400).send("Sort must be one of rating or app");
    }
  }

  if (genres) {
    if (
      !["Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"].includes(
        genres
      )
    ) {
      return res
        .status(400)
        .send(
          "Only the following genres are accepted: Action, Puzzle, Strategy, Casual, Arcade and Card"
        );
    }
  }

  let results = apps.filter(singularApp =>
    singularApp.Genres.toLowerCase().includes(genres.toLowerCase())
  );

  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }
  res.json(results);
});

app.listen(8000, () => {
  console.log("Server started on PORT 8000");
});
