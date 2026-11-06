/**
 * auth.routes.js - authentication endpoints.
 *
 *   POST /auth/signin   email + password -> JWT
 *   GET  /auth/signout  clears the token cookie
 *   GET  /api/protected an endpoint that exists only to prove the guard works:
 *                       without a valid token it returns 401, with one it
 *                       returns the signed-in user's id. Useful for the demo.
 */
import express from 'express'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/auth/signin').post(authCtrl.signin)
router.route('/auth/signout').get(authCtrl.signout)

router.route('/api/protected').get(authCtrl.requireSignin, (req, res) => {
  res.json({
    message: 'Token accepted. This is a protected route.',
    signedInAs: req.auth,
  })
})

export default router
