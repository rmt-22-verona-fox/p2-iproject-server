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

      const data = response.data.response.map(el => {
        const result = {
          season: el.season,
          start: el.date.start,
          status: {
            clock: el.status.clock,
            long: el.status.long,
            currentPeriods: el.periods.current,
            totalPeriods: el.periods.total,
          },
          arena: {
            name: el.arena.name,
            city: el.arena.city,
            state: el.arena.state,
            country: el.arena.country
          },
          visitors: {
            name: el.teams.visitors.name,
            code: el.teams.visitors.code,
            logo: el.teams.visitors.logo,
            points: el.scores.visitors.points,
            linescore: el.scores.visitors.linescore,
            statistics: {
              win: el.scores.visitors.win,
              loss: el.scores.visitors.loss,
              h2hWin: el.scores.visitors.series.win,
              h2hLoss: el.scores.visitors.series.loss
            }
          },
          home: {
            name: el.teams.home.name,
            code: el.teams.home.code,
            logo: el.teams.home.logo,
            points: el.scores.home.points,
            linescore: el.scores.home.linescore,
            statistics: {
              win: el.scores.home.win,
              loss: el.scores.home.loss,
              h2hWin: el.scores.home.series.win,
              h2hLoss: el.scores.home.series.loss
            }
          }
        }
        return result
      })

      res.status(200).json(data)
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

      const data = response.data.response.map(el => {
        const result = {
          rank: el.conference.rank,
          win: el.win,
          loss: el.loss,
          team: {
            name: el.team.name,
            code: el.team.code,
            logo: el.team.logo
          }
        }
        return result
      })

      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = Controller