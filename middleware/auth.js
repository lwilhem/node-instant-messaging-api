const jwt = require('jsonwebtoken')
const envProcess = require('dotenv')

envProcess.config()

module.exports.authMiddleWare = (req, res, next) => {
  try{
    const token = req.headers.authorization.split('')[1]
    const decodedToken = jwt.verify(token, process.env.JWT_KEY)  
    const userId = decodedToken.userId
    if( req.body.userId && req.body.userId == userId ){
      next()
    } else {
      throw 'Invalid  user ID'
    }
  } catch ( error ) {
    res.status(401).json({       
      error: new Error('Invalid request!')     
    });   
  } 
}
