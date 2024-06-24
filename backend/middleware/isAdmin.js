// isAdminMiddleware.js

const isAdmin = (req, res, next) => {
    const user = req.user; //  set req.user using userMiddleware
  console.log(user);
    if (user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied. Not an admin." });
    }
  
    next();
  };
  
  module.exports = isAdmin;