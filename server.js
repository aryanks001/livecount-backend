
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/followers/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const response = await axios.get(`https://twitter.com/${username}`);
    const match = response.data.match(/followers_count":(\d+)/);
    const followers = match ? Number(match[1]) : null;
    res.json({ username, followers });
  } catch (error) {
    res.status(500).json({ error: "User not found or Twitter layout changed." });
  }
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
