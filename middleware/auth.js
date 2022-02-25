const jwt = require('jsonwebtoken')
const envProcess = require('dotenv')

envProcess.config()

module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.JWT_KEY)  
    const userId = decodedToken.id
    if( userId ){
      next()
    } else {
      res.status(401).json({       
        message: 'invalid Id'
      });   
    }
  } catch ( error ) {
    res.status(401).json({       
      message: 'invalid JWT'
    });   
  } 
}
