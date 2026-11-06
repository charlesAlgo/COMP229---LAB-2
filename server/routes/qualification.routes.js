/**
 * qualification.routes.js - REST endpoints for /api/qualifications.
 *
 *   GET    /api/qualifications        list all
 *   POST   /api/qualifications        create
 *   DELETE /api/qualifications        delete all
 *   GET    /api/qualifications/:qualificationId   read one
 *   PUT    /api/qualifications/:qualificationId   update one
 *   DELETE /api/qualifications/:qualificationId   delete one
 *
 * Reads are public so the Assignment 1 front end can display content without a
 * login. Writes require a valid JWT, which is what "protected route" means here.
 */
import express from 'express'
import qualificationCtrl from '../controllers/qualification.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router
  .route('/api/qualifications')
  .get(qualificationCtrl.list)
  .post(authCtrl.requireSignin, qualificationCtrl.create)
  .delete(authCtrl.requireSignin, qualificationCtrl.removeAll)

router
  .route('/api/qualifications/:qualificationId')
  .get(qualificationCtrl.read)
  .put(authCtrl.requireSignin, qualificationCtrl.update)
  .delete(authCtrl.requireSignin, qualificationCtrl.remove)

// Whenever :qualificationId appears in a path, load that document first.
router.param('qualificationId', qualificationCtrl.byId)

export default router
