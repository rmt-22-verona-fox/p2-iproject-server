const { MyApplication } = require('../models')

class ControllerMyApplications {
  static async addMyApplications(req, res, next) {
    try {
      const { jobId, title, remote, companyName, description, source , createdDate } = req.body
      const newMyApplication = await MyApplication.create({
        UserId: req.user.id,
        jobId,
        title,
        remote,
        companyName,
        description,
        source,
        createdDate
      })

      const myApplication = await MyApplication.findOne({
        where: {jobId: newMyApplication.jobId},
        attributes: {exclude: ['createdAt', 'updatedAt']}
      })

      res.status(201).json({
        myApplication
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ControllerMyApplications