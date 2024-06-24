const User = require("../../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const appErr = require("../../utils/appErr");

//Register Form
const getRegisterUserController = async (req, res) => {
  try {
    res.json({ msg: "register user" });
  } catch (err) {
    console.log(err);
  }
};

//create user
const createUserController = async (req, res, next) => {
  const { role, userName, email, password } = req.body;
  if (!role || !userName || !email || !password) {
    // return next(appErr("All fields are required"));
    return res.json({msg:"All fields are required"});
    
  }

  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      // return next(appErr("User Already Exist"));
      return res.json({msg:"User Already exist"});
    }
    // Generate the salt   // // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create User(Register a user)
    const user = await User.create({
      role,
      userName,
      email,
      password: hashedPassword,
    });

    res.json(user);
  } catch (err) {
    res.json(err);
  }
};

// User Login route(Validation):
const loginUserController = async (req, res, next) => {
  const { role, email, password } = req.body;

  try {
    if (!role || !email || !password) {
      // return next(appErr("email & password are required"));
      return res.json({msg:"email& password required"});
    
    }

    //check user and password verification
    const userFound = await User.findOne({ email });
    const isPasswordValid = await bcrypt.compare(password, userFound.password);

    if (!userFound || !isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    } else {
      const userId = userFound._id;
      console.log(userId);
      //1.Generate Token
      const token = jwt.sign(
        { userId: userFound._id, username: userFound.userName, role: userFound.role },
        "anykey",
        { expiresIn: "1h" }
      );
      const redirectUrl = "/assets";
      const decodedToken = jwt.decode(token);
      res.json({
        success: true,
        role: userFound.role,
        id: userFound._id,
        token: token,
        decodedToken,
        redirectUrl,
      });
    }
  } catch {
    // return next(appErr("Error logging in", 500));
    return res.json({msg:"error"});
    
  }
};

const userProfileController = async (req, res) => {
  //  console.log(req.user)
  // console.log(req.user)

  try {
    const user = await User.findById(req.user);
    res.json({ user });
  } catch (Err) {
    return next(appErr("invalid"));
  }
};

const getLoginFormContoller = async (req, res) => {
  try {
    res.json({ msg: "Login form" });
  } catch (err) {
    return next(appErr("invalid"));
  }
};

module.exports = {
  getRegisterUserController,
  createUserController,
  userProfileController,
  getLoginFormContoller,
  loginUserController,
};
