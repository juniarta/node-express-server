export default (req, res, next) => {
  if (req.session && req.session.id) {
    next();
  }
  const err = new Error('User not authenticated');
  err.status = 401;
  next(err);
};
