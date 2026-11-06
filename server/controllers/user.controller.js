/**
 * user.controller.js - CRUD handlers for the "users" collection.
 *
 * Users are not run through the shared CRUD factory, because they differ in
 * three ways that matter: the password must never be returned, a password
 * change must go through the virtual field so it gets re-hashed, and listing
 * users must project away the credential columns.
 */
import User from '../models/user.model.js'
import errorHandler from '../helpers/dbErrorHandler.js'

/** Route param middleware - loads the user referenced by :userId. */
const byId = async (req, res, next, id) => {
  try {
    const user = await User.findById(id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    req.profile = user
    next()
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const list = async (req, res) => {
  try {
    const users = await User.find().select('name email created updated')
    res.json(users)
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const read = (req, res) => {
  // toJSON on the schema already strips hashed_password and salt
  res.json(req.profile)
}

const create = async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    res.status(201).json({ message: 'User created successfully', data: user })
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const update = async (req, res) => {
  try {
    const user = Object.assign(req.profile, req.body)
    // assigning req.body.password hits the virtual setter, which re-hashes
    user.updated = Date.now()
    await user.save()
    res.json({ message: 'User updated successfully', data: user })
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const remove = async (req, res) => {
  try {
    const deleted = await req.profile.deleteOne()
    res.json({ message: 'User deleted successfully', data: deleted })
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const removeAll = async (req, res) => {
  try {
    const result = await User.deleteMany({})
    res.json({ message: `${result.deletedCount} user(s) deleted successfully` })
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

export default { byId, list, read, create, update, remove, removeAll }
