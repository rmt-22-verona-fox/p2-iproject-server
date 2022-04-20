const axios = require('axios');

class Controller {
  static async fetchNews(req, res) {
    try {
      const news = await axios.get('https://newsapi.org/v2/everything?q=kripto&domains=viva.co.id&sortBy=publishedAt&pageSize=10&page=1&apiKey=50359eb08de64ac9b6b28866e095b008');
      return res.status(200).json({
        success: true,
        data: news.data
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = Controller;