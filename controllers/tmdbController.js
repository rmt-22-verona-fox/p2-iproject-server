const axios = require("axios");
const token = process.env.API_TOKEN
const api_key = process.env.API_KEY
  

class Controller {
  static async getPopular(req, res) {
    try {
      const response = await axios({
        url: `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let data = response.data.results.map((el) => {
        let obj = {
          title: el.title,
          imageUrl: el.poster_path,
          synopsis: el.overview,
          rating: el.vote_average,
        };
        return obj;
      });

      res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
  }


}

module.exports = Controller;
