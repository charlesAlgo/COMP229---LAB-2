/**
 * seed.js - optional. Fills the Portfolio database with a few real rows so the
 * Postman screenshots and the demo show data instead of empty arrays.
 *
 *   npm run seed
 *
 * It is safe to run more than once: it clears the three content collections
 * first, and it only creates the demo user if that email does not exist yet.
 */
import mongoose from 'mongoose'
import config from './config/config.js'
import Contact from './models/contact.model.js'
import Project from './models/project.model.js'
import Qualification from './models/qualification.model.js'
import User from './models/user.model.js'

const ME = { firstname: 'Charles', lastname: 'Shalua', email: 'charlesshalua01@gmail.com' }

const projects = [
  {
    ...ME,
    title: 'ElectricBid Pro - drawing reader',
    completion: new Date('2026-08-30'),
    description:
      'Vision pipeline that reads electrical drawings, counts devices and drafts an estimate for an estimator to approve. Cut a takeoff from 2-3 hours to about 10 minutes.',
  },
  {
    ...ME,
    title: 'Joe - weather data integration system',
    completion: new Date('2026-10-11'),
    description:
      'Batch ETL pipeline integrating Environment Canada historical data with the Open-Meteo forecast API into one unified daily table for a prediction service.',
  },
  {
    ...ME,
    title: 'React portfolio (Assignment 1)',
    completion: new Date('2026-10-04'),
    description:
      'Single-page React application built with Vite and React Router: home, about, projects, services, education and contact pages.',
  },
]

const qualifications = [
  {
    ...ME,
    title: 'Software Engineering & AI - Centennial College',
    completion: new Date('2028-04-30'),
    description: 'Six-semester co-op programme, currently in progress.',
  },
  {
    ...ME,
    title: 'Google Data Analytics Professional Certificate',
    completion: new Date('2025-06-01'),
    description: 'Data cleaning, analysis and visualisation with SQL, R and spreadsheets.',
  },
]

const contacts = [
  {
    firstname: 'Densley',
    lastname: 'Thomas',
    email: 'densley@altonelectric.example',
    message: 'Following up on the estimating system rollout.',
  },
]

const run = async () => {
  await mongoose.connect(config.mongoUri)
  console.log(`Connected to ${mongoose.connection.name}`)

  await Promise.all([
    Contact.deleteMany({}),
    Project.deleteMany({}),
    Qualification.deleteMany({}),
  ])

  await Contact.insertMany(contacts)
  await Project.insertMany(projects)
  await Qualification.insertMany(qualifications)

  const demoEmail = 'charlesshalua01@gmail.com'
  const existing = await User.findOne({ email: demoEmail })
  if (!existing) {
    const user = new User({ name: 'Charles Shalua', email: demoEmail, password: 'Portfolio2026' })
    await user.save()
    console.log(`Created demo user ${demoEmail} (password: Portfolio2026)`)
  } else {
    console.log(`Demo user ${demoEmail} already exists - left unchanged`)
  }

  console.log(
    `Seeded: ${contacts.length} contact(s), ${projects.length} project(s), ${qualifications.length} qualification(s)`
  )
  await mongoose.disconnect()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
