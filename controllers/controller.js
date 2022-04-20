"use strict";

const axios = require("axios");

class Controller {
  static getChart(req, res, next) {
    const options = {
      method: "GET",
      url: "https://billboard2.p.rapidapi.com/billboard_global_200",
      params: { date: "2020-09-19" },
      headers: {
        "X-RapidAPI-Host": process.env.HOST_CHART,
        "X-RapidAPI-Key": process.env.KEY_CHART,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const data = response.data.slice(0, 19);

        res.status(200).json({
          data,
        });
      })
      .catch(function (error) {
        next(error);
      });
  }

  static getTopArtist(req, res, next) {
    const options = {
      method: "GET",
      url: "https://billboard2.p.rapidapi.com/artist_100",
      params: { date: "2020-03-18" },
      headers: {
        "X-RapidAPI-Host": process.env.HOST_CHART,
        "X-RapidAPI-Key": process.env.KEY_CHART,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const data = response.data.slice(0, 19);

        res.status(200).json({
          data,
        });
      })
      .catch(function (error) {
        next(error);
      });
  }
}
module.exports = Controller;
