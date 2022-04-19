const axios = require("axios");

const API_KEY = process.env.YOUTUBE_API_KEY
class Controller {
  static async getDribble(req, res, next) {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            key: API_KEY,
            q: "basketball dribble drills",
            part: "snippet",
            type: "video",
            maxResults: 10,
          },
        }
      );
      res.status(200).json(response.data);
    } catch (err) {
      next(err.response.status);
    }
  }

  static async getPassing(req, res, next) {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            key: API_KEY,
            q: "basketball passing drills",
            part: "snippet",
            type: "video",
            maxResults: 10,
          },
        }
      );
      res.status(200).json(response.data);
    } catch (err) {
      next(err.response.status);
    }
  }

  static async getFinishing(req, res, next) {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            key: API_KEY,
            q: "basketball finishing drills",
            part: "snippet",
            type: "video",
            maxResults: 10,
          },
        }
      );
      res.status(200).json(response.data);
    } catch (err) {
      next(err.response.status);
    }
  }

  static async getShooting(req, res, next) {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            key: API_KEY,
            q: "basketball shooting drills",
            part: "snippet",
            type: "video",
            maxResults: 10,
          },
        }
      );
      res.status(200).json(response.data);
    } catch (err) {
      next(err.response.status);
    }
  }

  static async getFootwork(req, res, next) {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            key: API_KEY,
            q: "basketball footwork drills",
            part: "snippet",
            type: "video",
            maxResults: 10,
          },
        }
      );
      res.status(200).json(response.data);
    } catch (err) {
      next(err.response.status);
    }
  }
}

module.exports = Controller;
