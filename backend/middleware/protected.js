const appErr = require("../utils/appErr")

const protected = (req, res, next)=>{
    //check if user is login'
    console.log(req.session.userAuth);
    if(req.session.userAuth){
        next();
    }else{
       return next(appErr("User Not logged in"));
    }

}

module.exports = protected;