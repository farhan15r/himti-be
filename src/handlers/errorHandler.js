const ClientError = require('../exceptions/ClientError');

const errorHandler = (err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.statusCode).json({
      code: err.statusCode,
      message: err.message,
    });
  } else {
    // console.log(err);
    res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
    });
  }

  next();
};

module.exports = errorHandler;
