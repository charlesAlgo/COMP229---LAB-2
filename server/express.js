/**
 * express.js - builds the Express application.
 *
 * Kept separate from server.js on purpose: this file creates the app and knows
 * nothing about ports or databases, so it can be imported and tested on its
 * own. server.js is the only place that opens a connection and listens.
 */
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'

import config from './config/config.js'
import contactRoutes from './routes/contact.routes.js'
import projectRoutes from './routes/project.routes.js'
import qualificationRoutes from './routes/qualification.routes.js'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

/* ---------- middleware ---------- */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
  cors({
    origin: config.clientOrigin, // the Vite dev server
    credentials: true,
  })
)

/* ---------- the message the assignment asks for ---------- */
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to MyPortfolio application.' })
})

/* ---------- API routes ---------- */
app.use('/', contactRoutes)
app.use('/', projectRoutes)
app.use('/', qualificationRoutes)
app.use('/', userRoutes)
app.use('/', authRoutes)

/* ---------- production: serve the built React app ---------- */
if (config.env === 'production') {
  const clientDist = path.join(__dirname, '..', 'client', 'dist')
  app.use(express.static(clientDist))
  app.get(/^(?!\/api|\/auth).*/, (req, res) =>
    res.sendFile(path.join(clientDist, 'index.html'))
  )
}

/* ---------- 404 for anything unmatched under /api ---------- */
app.use('/api', (req, res) => {
  res.status(404).json({ error: `Endpoint not found: ${req.method} ${req.originalUrl}` })
})

/* ---------- last-resort error handler ---------- */
app.use((err, req, res, next) => {
  console.error('[error]', err.message)
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' })
})

export default app
