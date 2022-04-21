const { MyApplication } = require('../models')

class ControllerMyApplications {
  static async addMyApplication(req, res, next) {
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

  static async allMyApplications(req, res, next) {
    try {
      const myApplications = await MyApplication.findAll({
        where: {UserId: req.user.id},
        attributes: {exclude: ['createdAt', 'updatedAt']},
        order: [['createdAt', 'DESC']]
      })
      res.status(200).json(
        myApplications
      )
    } catch (err) {
      next(err)
    }
  }

  static async deleteMyApplication(req, res, next) {
    try {
      const { id } = req.params
      const myApplication = await MyApplication.findByPk(id)

      if(!myApplication) {
        throw { name: 'YOUR_APPLICATION_NOT_FOUND', statusCode: 404 }
      }

      await MyApplication.destroy({where:{id}})

      res.status(200).json({
        message: `Success deleted application with ID ${id}`
      })
    } catch (err) {
      next(err)
    }
  }

  static async updateStatusMyApplication(req, res, next) {
    try {
      const { id } = req.params
      const { status } = req.body

      const updatedMyApplication = await MyApplication.update(
        { status },
        {
          where: { id },
          returning: true,
        }
      );
    
      if(!updatedMyApplication[0]) {
        throw { name: 'YOUR_APPLICATION_NOT_FOUND', statusCode: 404 }
      }

      res.status(200).json(
        updatedMyApplication[1][0]
      )
    } catch (err) {
      next(err)
    }
  }

}

module.exports = ControllerMyApplications