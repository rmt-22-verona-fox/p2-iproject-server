const { Food } = require('../models');

const authoritation = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log('line 34 <<<<<<<<<<<');
    const searchFood = await Food.findByPk(id);
    if (!searchFood) {
      throw { name: 'not found', statusCode: 404 };
    } else if (req.loginfo.role === 'admin') {
      next();
    } else {
      throw { name: 'Forbidden', statusCode: 403 };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authoritation;
