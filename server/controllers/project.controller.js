/**
 * project.controller.js - CRUD handlers for the "projects" collection.
 * The six operations come from the shared factory, bound to the Project model.
 */
import Project from '../models/project.model.js'
import buildCrudController from './crud.factory.js'

const { byId, list, read, create, update, remove, removeAll } =
  buildCrudController(Project, 'Project')

export default { byId, list, read, create, update, remove, removeAll }
