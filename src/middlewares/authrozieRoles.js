const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const user = req.user;
    if (!roles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role ${user.role} is not allowed to access this resource`,
      });
    }

    next();
  };
};
