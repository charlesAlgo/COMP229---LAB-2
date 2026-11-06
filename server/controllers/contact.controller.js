/**
 * contact.controller.js - CRUD handlers for the "contacts" collection.
 * The six operations come from the shared factory, bound to the Contact model.
 */
import Contact from '../models/contact.model.js'
import buildCrudController from './crud.factory.js'

const { byId, list, read, create, update, remove, removeAll } =
  buildCrudController(Contact, 'Contact')

export default { byId, list, read, create, update, remove, removeAll }
