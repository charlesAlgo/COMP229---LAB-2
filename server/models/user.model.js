/**
 * user.model.js - Mongoose schema for the "users" collection.
 *
 * Fields required by the assignment: name, email, password, created, updated.
 *
 * Security note: the plain password is NEVER stored. It arrives through a
 * virtual field, is hashed with PBKDF2 (SHA-512, 10,000 iterations) against a
 * per-user random salt, and only the hash and the salt reach the database.
 * authenticate() re-hashes the attempt with the stored salt and compares.
 */
import crypto from 'crypto'
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: [true, 'Name is required'] },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
      required: [true, 'Email is required'],
    },
    hashed_password: { type: String, required: [true, 'Password is required'] },
    salt: { type: String },
    created: { type: Date, default: Date.now },
    updated: { type: Date },
  },
  { collection: 'users' }
)

/* ---- virtual password field: write-only, never persisted ---- */
UserSchema.virtual('password')
  .set(function (password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function () {
    return this._password
  })

UserSchema.path('hashed_password').validate(function () {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.')
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
  }
}, null)

UserSchema.methods = {
  /** Re-hash the attempt with this user's salt and compare. */
  authenticate(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },

  encryptPassword(password) {
    if (!password) return ''
    try {
      return crypto
        .pbkdf2Sync(password, this.salt, 10000, 64, 'sha512')
        .toString('hex')
    } catch (err) {
      return ''
    }
  },

  makeSalt() {
    return crypto.randomBytes(16).toString('hex')
  },
}

/** Never leak the hash or the salt through an API response. */
UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.hashed_password
    delete ret.salt
    delete ret.__v
    return ret
  },
})

export default mongoose.model('User', UserSchema)
