/**
 * config.js - every environment-dependent value in one place.
 *
 * Nothing else in the backend reads process.env directly, so switching between
 * a local MongoDB and MongoDB Atlas is a change to .env, not a change to code.
 */
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Load MyPortfolio/.env by absolute path, not from the current directory.
// The assignment runs the server from client/ ("nodemon ../server.js"), where
// a bare dotenv.config() would look for client/.env, find nothing, and fall
// back to a local MongoDB that is not running.
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '..', '..', '.env'), quiet: true })

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'COMP229_PORTFOLIO_DEV_SECRET',
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_URI ||
    'mongodb://127.0.0.1:27017/Portfolio',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
}

export default config
