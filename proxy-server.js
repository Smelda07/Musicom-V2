const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

// 🔹 Přidání CORS hlaviček pro všechny odpovědi
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/api/musicom/countries", async (req, res) => {
  try {
    const response = await fetch("https://edbs.turyna.eu/api/musicom/countries");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ error: "Failed to fetch countries" });
  }
});

const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Proxy server běží na http://localhost:${PORT}`);
});
