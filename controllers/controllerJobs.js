const axios = require("axios").default;

class ControllerJobs {
  static async allJobs(req, res, next) {
    try {
      const { title, source, remote } = req.query;
      const response = await axios.get(
        `https://findwork.dev/api/jobs/?search=${title}&source=${source}&location=&remote=${remote}&company_num_employees=&employment_type=&order_by=`,
        {
          headers: {
            Authorization: process.env.API_KEY_FINDWORK,
          },
        }
      );
      let data = response.data.results.slice(0, 6);

      let jobs = [];

      if (title) {
        data.forEach((el) => {
          if (el.role.toLowerCase().includes(title.toLowerCase()) === true) {
            jobs.push(el);
          }
        });
      } else {
        jobs = data;
      }

      res.status(200).json(jobs);
    } catch (err) {
      console.log(err);
      if (err.response) {
        err = { name: "JOB_NOT_FOUND", statusCode: 404 };
        next(err);
      } else {
        next(err);
      }
    }
  }
}

module.exports = ControllerJobs;
