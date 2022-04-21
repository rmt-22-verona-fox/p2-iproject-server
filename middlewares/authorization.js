const { MyApplication } = require('../models')

const authorization = async (req, res, next) => {
  try {
    const { id } = req.params
    const myApplication = await MyApplication.findByPk(id)

    if(!myApplication) {
      throw { name: 'YOUR_APPLICATION_NOT_FOUND', statusCode: 404 }
    } else if(myApplication.UserId === req.user.id) {
      next()
    } else {
      throw { name: "Forbidden", statusCode: 403 };
    }
  } catch (err) {
    next(err)
  }
}

const duplicateApplication = async (req, res, next) => {
  try {
    const { jobId } = req.body

    const myApplication = await MyApplication.findOne({
      where: {jobId}
    })

    if(myApplication) {
      throw { name: 'DUPLICATE_APPLICATION', statusCode: 409}
    }
    next()
  } catch (err) {
    next(err)
  }
}

const limitTotalApplication = async (req, res, next) => {
  try {
    const UserId = req.user.id

    const myApplications = await MyApplication.findAll({
      where: {UserId}
    })

    if(myApplications.length >= 3) {
      throw { name: 'MAX_TOTAL_APPLICATION', statusCode: 409}
    }
    next()
  } catch (err) {
    next(err)
  }
}

module.exports= {
  authorization,
  duplicateApplication,
  limitTotalApplication
}