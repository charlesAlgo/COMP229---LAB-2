/**
 * user.routes.js - REST endpoints for /api/users.
 *
 *   GET    /api/users          list all users (no passwords returned)
 *   POST   /api/users          register a new user          [public]
 *   DELETE /api/users          delete all users             [signed in]
 *   GET    /api/users/:userId  read one user
 *   PUT    /api/users/:userId  update one user              [signed in + owner]
 *   DELETE /api/users/:userId  delete one user              [signed in + owner]
 *
 * Registration has to be public, otherwise nobody could ever create the first
 * account. Editing or deleting a specific user additionally requires that the
 * signed-in user IS that user - that is what hasAuthorization enforces.
 */
import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router
  .route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create)
  .delete(authCtrl.requireSignin, userCtrl.removeAll)

router
  .route('/api/users/:userId')
  .get(userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

router.param('userId', userCtrl.byId)

export default router
