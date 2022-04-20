const axios = require('axios');

class Controller {
  static async fetchCrypto(req, res) {
    try {
      const crypto = await axios.get('https://indodax.com/api/summaries');
      return res.status(200).json({
        success: true,
        data: crypto.data
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