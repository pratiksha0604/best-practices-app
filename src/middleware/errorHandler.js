function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

function notFound(req, res, next) {
  next(httpError(404, 'Route not found'));
}

function errorHandler(err, req, res, next) {
  if (err.message && err.message.includes('UNIQUE constraint failed')) {
    return res.status(409).json({ error: 'Email already exists' });
  }
  const status = err.status || 500;
  if (status === 500) console.error(err);
  res.status(status).json({
    error: status === 500 ? 'Internal server error' : err.message,
  });
}

module.exports = { httpError, notFound, errorHandler };