exports.getCurrentUser = function (req, res, next) {
  const user = req.user;

  if(!user) {
    return res.sendStatus(422);
  }

  return res.json(user);
};
