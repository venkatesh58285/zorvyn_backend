const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          error: `Access denied. Required roles: ${allowedRoles.join(", ")}. Your role: ${req.user.role}`,
        });
      }

      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

module.exports = authorize;
