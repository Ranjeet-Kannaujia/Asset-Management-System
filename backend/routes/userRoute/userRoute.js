const express = require("express");
const {
  getRegisterUserController,
  createUserController,
  loginUserController,
  getLoginFormContoller,
  userProfileController,
} = require("../../controllers/userController/UserController");
const isLogin = require("../../middleware/isLogin");
const isAdmin = require("../../middleware/isAdmin");
const userRoute = express.Router();
// const {protectedMiddleware} = require("../../middleware/protectedMiddleware");



userRoute.get("/register",  getRegisterUserController);

//user register
userRoute.post("/register", createUserController);

//user Login
userRoute.post("/login", loginUserController);

userRoute.get("/profile/",isLogin, userProfileController);

userRoute.get("/login", getLoginFormContoller);

module.exports = userRoute;
