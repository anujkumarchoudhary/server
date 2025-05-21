const jwt = require("jsonwebtoken")
module.exports=function(req, res, next){
    const token=req.header("Authorization")
    if(!token){
        return res.status(401).json({message:"authorization denied"})
    }
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRETE)
        req.user=decode.user
        next()
    }
    catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }       
}