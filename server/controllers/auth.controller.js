/**
 * auth.controller.js - sign in, sign out, and the two guards that protect routes.
 *
 * Flow:
 *   POST /auth/signin   email + password  ->  verify hash  ->  return a JWT
 *   GET  /auth/signout  clears the cookie copy of the token
 *   requireSignin       rejects a request with no / bad / expired token
 *   hasAuthorization    rejects a signed-in user editing somebody else's record
 *
 * The token is returned in the response body (for a client that stores it) and
 * also set as a cookie, which is what makes a signout endpoint meaningful.
 *
 * Note on the library choice: the week 6 slides use express-jwt. The token is
 * verified here with jsonwebtoken directly in a four-line middleware. It is the
 * same JWT standard and the same secret, with one dependency fewer and an
 * error shape we control.
 */
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import config from '../config/config.js'

const TOKEN_TTL = '1d'

const signin = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = await User.findOne({ email: String(email).toLowerCase() })
    if (!user) return res.status(401).json({ error: 'User not found' })

    if (!user.authenticate(password)) {
      return res.status(401).json({ error: 'Email and password do not match' })
    }

    const token = jwt.sign({ _id: user._id, email: user.email }, config.jwtSecret, {
      expiresIn: TOKEN_TTL,
    })

    res.cookie('t', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })

    return res.json({
      message: 'Signed in successfully',
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    })
  } catch (err) {
    return res.status(401).json({ error: 'Could not sign in' })
  }
}

const signout = (req, res) => {
  res.clearCookie('t')
  return res.json({ message: 'Signed out successfully' })
}

/** Guard 1: a valid token must be present. */
const requireSignin = (req, res, next) => {
  const header = req.headers.authorization || ''
  const bearer = header.startsWith('Bearer ') ? header.slice(7) : null
  const token = bearer || (req.cookies && req.cookies.t)

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' })
  }

  try {
    req.auth = jwt.verify(token, config.jwtSecret)
    return next()
  } catch (err) {
    const reason = err.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token'
    return res.status(401).json({ error: `Access denied. ${reason}.` })
  }
}

/** Guard 2: the signed-in user must be the owner of the record being changed. */
const hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id.toString() === req.auth._id.toString()
  if (!authorized) {
    return res.status(403).json({ error: 'User is not authorized to perform this action' })
  }
  return next()
}

export default { signin, signout, requireSignin, hasAuthorization }
