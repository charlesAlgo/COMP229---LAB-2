/**
 * dbErrorHandler.js - turns a Mongoose/MongoDB error into one readable sentence.
 *
 * Controllers call this so the client always receives { error: "..." } instead
 * of a raw driver error, which is both unreadable and leaks internals.
 */

const getUniqueErrorMessage = (err) => {
  try {
    const begin = err.message.lastIndexOf('index:') + 'index:'.length
    const fieldName = err.message.substring(begin, err.message.lastIndexOf('_1')).trim()
    return `${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)} already exists`
  } catch (ex) {
    return 'Unique field already exists'
  }
}

const getErrorMessage = (err) => {
  if (!err) return 'Unknown server error'

  // duplicate key
  if (err.code === 11000 || err.code === 11001) return getUniqueErrorMessage(err)

  // schema validation
  if (err.errors) {
    const messages = Object.values(err.errors).map((e) => e.message)
    if (messages.length) return messages.join('. ')
  }

  // malformed ObjectId
  if (err.name === 'CastError') return `Invalid ${err.path}: "${err.value}"`

  return err.message || 'Unknown server error'
}

export default { getErrorMessage }
