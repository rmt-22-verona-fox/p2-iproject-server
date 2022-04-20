const axios = require('axios').default

class ControllerJobs {
  static async allJobs(req, res, next) {
    try {
      const { title, source, remote } = req.query
      const response = await axios.get(`https://findwork.dev/api/jobs/?search=${title}&source=${source}&location=&remote=${remote}&company_num_employees=&employment_type=&order_by=`, {
        headers: 
          { 
            Authorization: `Token ${process.env.API_KEY_FINDWORK}`,
          } 
      })
      const data = response.data.results
      
      
      res.status(200).json(data)
    } catch (err) {
      if(err.response) {
        err = { name: "JOB_NOT_FOUND", statusCode: 404 }
        next(err)
      } else {
        next(err)
      }
    }
  }
}

module.exports = ControllerJobs