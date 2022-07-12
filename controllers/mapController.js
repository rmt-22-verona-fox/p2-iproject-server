const axios = require("axios");
const url = require("url");
require("dotenv").config();

class MapController {
  static async fetchSearchData(req, res) {
    try {
      const params = new URLSearchParams({
        access_token: process.env.API_KEY,
        ...url.parse(req.url, true).query,
      });
      const query = req.params.query;
      console.log(query);
      const data = await axios(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?${params}`
      );
      res.status(200).json(data.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = MapController;
