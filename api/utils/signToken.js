
const jwt = require('jsonwebtoken')

const generateToken = (id)=>{
    return jwt.sign({id}, process.env.MONGODB_SECRETE, )
}