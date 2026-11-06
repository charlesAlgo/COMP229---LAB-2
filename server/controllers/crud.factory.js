/**
 * crud.factory.js - the six CRUD handlers, built once and reused per model.
 *
 * Design note (worth saying out loud in the demo): contacts, projects and
 * qualifications need the exact same six operations. Writing them three times
 * would mean fixing every future bug three times. The factory takes a Mongoose
 * model and returns the handlers bound to it, so each controller stays a short,
 * readable file that still exposes named functions the routes can import.
 *
 *   list      GET    /api/<resource>
 *   read      GET    /api/<resource>/:id
 *   create    POST   /api/<resource>
 *   update    PUT    /api/<resource>/:id
 *   remove    DELETE /api/<resource>/:id
 *   removeAll DELETE /api/<resource>
 */
import errorHandler from '../helpers/dbErrorHandler.js'

const buildCrudController = (Model, label) => {
  /** Route param middleware: load the document once, attach it to the request. */
  const byId = async (req, res, next, id) => {
    try {
      const doc = await Model.findById(id)
      if (!doc) return res.status(404).json({ error: `${label} not found` })
      req.doc = doc
      next()
    } catch (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
  }

  const list = async (req, res) => {
    try {
      const docs = await Model.find().sort({ created: -1 })
      res.json(docs)
    } catch (err) {
      res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
  }

  const read = (req, res) => res.json(req.doc)

  const create = async (req, res) => {
    try {
      const doc = new Model(req.body)
      await doc.save()
      res.status(201).json({ message: `${label} created successfully`, data: doc })
    } catch (err) {
      res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
  }

  const update = async (req, res) => {
    try {
      const doc = Object.assign(req.doc, req.body)
      doc.updated = Date.now()
      await doc.save()
      res.json({ message: `${label} updated successfully`, data: doc })
    } catch (err) {
      res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
  }

  const remove = async (req, res) => {
    try {
      const deleted = await req.doc.deleteOne()
      res.json({ message: `${label} deleted successfully`, data: deleted })
    } catch (err) {
      res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
  }

  const removeAll = async (req, res) => {
    try {
      const result = await Model.deleteMany({})
      res.json({ message: `${result.deletedCount} ${label.toLowerCase()}(s) deleted successfully` })
    } catch (err) {
      res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
  }

  return { byId, list, read, create, update, remove, removeAll }
}

export default buildCrudController
