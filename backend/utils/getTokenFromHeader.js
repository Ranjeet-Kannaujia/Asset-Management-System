const appErr = require("./appErr");

const getTokenFromHeader = (req, res, next)=>{
    const headerObj = req.headers;
    console.log(headerObj)
    const token = headerObj['authorization'].split(" ")[1];
    // const token = headerObj.authorization;

    if(token != undefined){
        return token;
    }else{
        return next(appErr("Token invalid"));
    }
}

module.exports = getTokenFromHeader;