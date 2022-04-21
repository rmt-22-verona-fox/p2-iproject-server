const errorHandler = (err, req, res, next) => {
  switch (err) {
    case 400:
      res.status(400).json({
        message: 'Bad Request'
      })
      break;
  
    default:
      res.status(500).json({
        message: 'Internal Server Error'
      })
      break;
  }
}

module.exports = errorHandler