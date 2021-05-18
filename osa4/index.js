const app = require('./app') 
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const logger2 = require('./utils/logger')


const server = http.createServer(app)
const server2 = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

server2.listen(config.PORT_3003, () => {
  logger2.info(`Server running on port ${config.PORT_3003}`)
})