const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })

const connectDB = require('./config/db')
connectDB()

const express = require('express')
const path = require('path')
const chalk = require('chalk')
const auth = require('./middleware/auth')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan')
  app.use(morgan('dev'))
}

app.use('/api/users', require('./routes/users'))
app.use('/api/notes', auth, require('./routes/notes'))
app.use('/api/publicNotes', require('./routes/publicNotes'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'frontend', 'build')))
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}

const http = require('http')
const server = http.createServer(app)

server.listen(process.env.PORT, () => {
  console.log(chalk.green(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}...`))
})

const uuid = require('uuid')
const webSocketServer = require('websocket').server
const wsServer = new webSocketServer({ httpServer: server })
const client = {}

wsServer.on('request', request => {
  const userID = uuid.v4()
  const connection = request.accept(null, request.origin)
  client[userID] = connection

  connection.on('message', message => {
    if (message.type === 'utf8') {
      for (key in client) {
        client[key].sendUTF(message.utf8Data)
      }
    }
  })
})