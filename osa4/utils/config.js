require('dotenv').config()

let PORT = process.env.PORT
let PORT_3003 = process.env.PORT_3


const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT,
  PORT_3003
}

