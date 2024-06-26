const appErr = require("../utils/appErr");
const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

const isLogin = (req, res, next)=>{
//get token from req header
const token = getTokenFromHeader(req);
console.log(token);
// verify
const decodedUser = verifyToken(token);
//save the user into req obj
 req.user = decodedUser.userId;
if(!decodedUser){
    return next(appErr("Invalid/Expired Token , please login again", 401));
}
next();
};

module.exports = isLogin;