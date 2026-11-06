/**
 * qualification.model.js - Mongoose schema for the "qualifications" collection.
 * Fields required by the assignment: title, firstname, lastname, email,
 * completion (Date), description.
 */
import mongoose from 'mongoose'

const QualificationSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: [true, 'Title is required'] },
    firstname: { type: String, trim: true, required: [true, 'First name is required'] },
    lastname: { type: String, trim: true, required: [true, 'Last name is required'] },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
      required: [true, 'Email is required'],
    },
    completion: { type: Date, required: [true, 'Completion date is required'] },
    description: { type: String, trim: true, required: [true, 'Description is required'] },
    created: { type: Date, default: Date.now },
    updated: { type: Date },
  },
  { collection: 'qualifications' }
)

export default mongoose.model('Qualification', QualificationSchema)
