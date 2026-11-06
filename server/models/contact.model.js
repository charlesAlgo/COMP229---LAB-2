/**
 * contact.model.js - Mongoose schema for the "contacts" collection.
 *
 * Fields required by the assignment: firstname, lastname, email.
 * The two extra optional fields (phone, message) exist because the Assignment 1
 * contact form already collects them; they are optional so a request carrying
 * only the three required fields still validates.
 */
import mongoose from 'mongoose'

const ContactSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
      required: [true, 'First name is required'],
    },
    lastname: {
      type: String,
      trim: true,
      required: [true, 'Last name is required'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: false,
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
      required: [true, 'Email is required'],
    },
    phone: { type: String, trim: true },
    message: { type: String, trim: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date },
  },
  { collection: 'contacts' }
)

export default mongoose.model('Contact', ContactSchema)
