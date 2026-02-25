const isUser = (req, res, next) => {
  const role = req.user.role;
  if (role !== "user") {
    return res.status(403).json({ message: "Access denied" });
  }

  next();
};

export default isUser;
