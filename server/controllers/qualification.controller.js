/**
 * qualification.controller.js - CRUD handlers for the "qualifications" collection.
 * The six operations come from the shared factory, bound to the Qualification model.
 */
import Qualification from '../models/qualification.model.js'
import buildCrudController from './crud.factory.js'

const { byId, list, read, create, update, remove, removeAll } =
  buildCrudController(Qualification, 'Qualification')

export default { byId, list, read, create, update, remove, removeAll }
