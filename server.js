const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get("/followers/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const response = await axios.get(`https://nitter.net/${username}`);
    const $ = cheerio.load(response.data);
    const followersText = $('a[href$="/followers"] .profile-stat-num').first().text();

    if (!followersText) {
      return res.status(404).json({ error: "User not found or layout changed." });
    }

    const followers = parseInt(followersText.replace(/,/g, ""));
    res.json({ username, followers });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
