/**
 * project.routes.js - REST endpoints for /api/projects.
 *
 *   GET    /api/projects        list all
 *   POST   /api/projects        create
 *   DELETE /api/projects        delete all
 *   GET    /api/projects/:projectId   read one
 *   PUT    /api/projects/:projectId   update one
 *   DELETE /api/projects/:projectId   delete one
 *
 * Reads are public so the Assignment 1 front end can display content without a
 * login. Writes require a valid JWT, which is what "protected route" means here.
 */
import express from 'express'
import projectCtrl from '../controllers/project.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router
  .route('/api/projects')
  .get(projectCtrl.list)
  .post(authCtrl.requireSignin, projectCtrl.create)
  .delete(authCtrl.requireSignin, projectCtrl.removeAll)

router
  .route('/api/projects/:projectId')
  .get(projectCtrl.read)
  .put(authCtrl.requireSignin, projectCtrl.update)
  .delete(authCtrl.requireSignin, projectCtrl.remove)

// Whenever :projectId appears in a path, load that document first.
router.param('projectId', projectCtrl.byId)

export default router
