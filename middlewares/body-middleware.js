function bodyMiddleware(req, res, next) {
  req.body.owner_id = req.user.id;
  req.body.created_date = new Date();
  req.body.modified_date = new Date();
  next();
}

module.exports = bodyMiddleware;
