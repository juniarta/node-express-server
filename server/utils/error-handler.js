const errorHandler = (err, req, res, next) => {
  err.httpStatusCode || err.code
    ? res.status(err.httpStatusCode || err.code).json({ error: err })
    : next(err);
};

export default errorHandler;
