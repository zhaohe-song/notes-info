require('dotenv').config()

const connectDB = require('./db')
connectDB()

const express = require('express')
const path = require('path')
const chalk = require('chalk')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/notes', require('./routes/notes'))

if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan')
  app.use(morgan('combined'))
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'frontend', 'build')))
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}

app.listen(process.env.PORT, () => {
  console.log(chalk.green(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}...`))
})