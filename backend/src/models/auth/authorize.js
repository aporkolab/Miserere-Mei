module.exports = minimumRole => (req, res, next) => {
  const role = Number(req.user?.role);

  if (!Number.isInteger(role) || role < minimumRole) {
    return res.status(403).json({ message: 'Insufficient permissions' });
  }

  return next();
};
