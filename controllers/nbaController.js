const axios = require('axios')

const host = 'api-nba-v1.p.rapidapi.com'
const NBA_API_KEY = process.env.NBA_API_KEY

class Controller {
  static async getGames(req, res, next) {
    try {
      const {season, date} = req.body
      const response = await axios.get('https://api-nba-v1.p.rapidapi.com/games', {
        params: {
          season,
          date
        },
        headers: {
          'X-RapidAPI-Host': host,
          'X-RapidAPI-Key': NBA_API_KEY
        }
      })
      res.status(200).json(response.data.response)
    } catch (err) {
      next(err)
    }
  }

  static async getSeasons(req, res, next) {
    try {
      const response = await axios.get('https://api-nba-v1.p.rapidapi.com/seasons',{
        headers: {
          'X-RapidAPI-Host': host,
          'X-RapidAPI-Key': NBA_API_KEY
        }
      })
      res.status(200).json(response.data.response)
    } catch (err) {

      next(err)
    }
  }

  static async getStandings(req, res, next) {
    try {
      const {season, conference} = req.body
      const response = await axios.get('https://api-nba-v1.p.rapidapi.com/standings',{
        headers: {
          'X-RapidAPI-Host': host,
          'X-RapidAPI-Key': NBA_API_KEY
        },
        params: {
          season,
          conference,
          league: 'standard'
        }
      })
      res.status(200).json(response.data.response)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = Controller