/**
 * contact.routes.js - REST endpoints for /api/contacts.
 *
 *   GET    /api/contacts        list all
 *   POST   /api/contacts        create
 *   DELETE /api/contacts        delete all
 *   GET    /api/contacts/:contactId   read one
 *   PUT    /api/contacts/:contactId   update one
 *   DELETE /api/contacts/:contactId   delete one
 *
 * Creating a contact is public, because the Assignment 1 contact form must work
 * for a visitor who is not signed in. Every other write (update, delete, delete
 * all) requires a valid JWT - a visitor may leave a message, only the owner may
 * change or remove one.
 */
import express from 'express'
import contactCtrl from '../controllers/contact.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router
  .route('/api/contacts')
  .get(contactCtrl.list)
  .post(contactCtrl.create) // public: the Assignment 1 contact form posts here
  .delete(authCtrl.requireSignin, contactCtrl.removeAll)

router
  .route('/api/contacts/:contactId')
  .get(contactCtrl.read)
  .put(authCtrl.requireSignin, contactCtrl.update)
  .delete(authCtrl.requireSignin, contactCtrl.remove)

// Whenever :contactId appears in a path, load that document first.
router.param('contactId', contactCtrl.byId)

export default router
