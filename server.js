/**
 * server.js - entry point. Connects to MongoDB, then starts the web server.
 *
 *   node server.js        start once
 *   npm run dev           start with nodemon (restarts on save)
 *
 * The connection is opened BEFORE listening, so the app never accepts a
 * request it cannot serve. If MongoDB is unreachable the process exits with a
 * clear message instead of failing on every request afterwards.
 */
import mongoose from 'mongoose'
import app from './server/express.js'
import config from './server/config/config.js'

mongoose.Promise = global.Promise

/** Replaces the password in a connection string with asterisks, for logging. */
const safeUri = (uri) => String(uri).replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@')

const start = async () => {
  try {
    await mongoose.connect(config.mongoUri)
    console.log('------------------------------------------------------------')
    console.log(`Connected to MongoDB : ${mongoose.connection.name}`)
    console.log(`Host                 : ${mongoose.connection.host}`)
    console.log(`Collections expected : contacts, projects, qualifications, users`)
    console.log('------------------------------------------------------------')
  } catch (err) {
    // Never print the raw URI: it contains the database password, which would
    // then appear in the console, in logs, and in any screenshot of them.
    console.error(`Unable to connect to database: ${safeUri(config.mongoUri)}`)
    console.error(err.message)
    process.exit(1)
  }

  app.listen(config.port, (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.info(`Server started on port ${config.port}.`)
    console.info(`Open http://localhost:${config.port}/ to see the welcome message.`)
  })
}

start()
