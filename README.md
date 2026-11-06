# MyPortfolio — Backend (COMP 229 Assignment 2)

Node.js + Express REST APIs over MongoDB (Mongoose ODM) for the portfolio
application whose front end was built in Assignment 1.

**Charles Shalua** · Centennial College · Fall 2026

---

## 1. What is here

```
MyPortfolio/
├── server.js                 entry point: connect to MongoDB, then listen
├── package.json              backend dependencies and scripts
├── .env                      your real settings (not committed)
├── .env.example              template to copy
├── client/                   the Assignment 1 React front end
├── server/
│   ├── express.js            builds the Express app (middleware + routes)
│   ├── config/config.js      every environment value in one place
│   ├── models/               Mongoose schemas
│   │   ├── contact.model.js        → collection "contacts"
│   │   ├── project.model.js        → collection "projects"
│   │   ├── qualification.model.js  → collection "qualifications"
│   │   └── user.model.js           → collection "users"
│   ├── controllers/
│   │   ├── crud.factory.js         the six CRUD handlers, written once
│   │   ├── contact.controller.js
│   │   ├── project.controller.js
│   │   ├── qualification.controller.js
│   │   ├── user.controller.js      (separate: passwords need special care)
│   │   └── auth.controller.js      signin / signout / route guards
│   ├── routes/               one file per resource
│   ├── helpers/dbErrorHandler.js   readable messages from Mongoose errors
│   └── seed.js               optional sample data
├── tools/smoke-test.mjs      hits every endpoint and prints PASS/FAIL
└── postman/                  importable Postman collection (28 requests)
```

## 2. Setup

```bash
# 1. install backend dependencies
npm install

# 2. install front-end dependencies
cd client && npm install && cd ..

# 3. create your .env
copy .env.example .env        # Windows   (cp on macOS/Linux)
```

Then edit `.env` and set `MONGODB_URI`:

| Where your database lives | Value |
|---|---|
| Local MongoDB | `mongodb://127.0.0.1:27017/Portfolio` |
| MongoDB Atlas | `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/Portfolio?retryWrites=true&w=majority` |

## 3. Running it

**Backend only**

```bash
node server.js
```

Console shows the database name and host, then `Server started on port 3000.`
Open <http://localhost:3000/> — you should see:

```json
{ "message": "Welcome to MyPortfolio application." }
```

**Front end only**

```bash
cd client
npm run dev          # http://localhost:5173
```

**Both at once** (what the assignment asks for) — from the `client` folder:

```bash
cd client
npm run dev          # runs Vite AND nodemon ../server.js concurrently
```

**Optional sample data**

```bash
npm run seed
```

## 4. The REST API

Base URL `http://localhost:3000`

| Method | URL | Action | Auth |
|---|---|---|---|
| GET | `/api/contacts` | get all contacts | – |
| GET | `/api/contacts/:id` | get contact by id | – |
| POST | `/api/contacts` | add new contact | – (the public form posts here) |
| PUT | `/api/contacts/:id` | update contact by id | JWT |
| DELETE | `/api/contacts/:id` | remove contact by id | JWT |
| DELETE | `/api/contacts` | remove all contacts | JWT |

`/api/projects` and `/api/qualifications` expose the same six operations, with
every write protected by JWT.

| Method | URL | Action | Auth |
|---|---|---|---|
| GET | `/api/users` | get all users (no passwords) | – |
| GET | `/api/users/:id` | get user by id | – |
| POST | `/api/users` | register | – |
| PUT | `/api/users/:id` | update user | JWT + owner |
| DELETE | `/api/users/:id` | remove user | JWT + owner |
| DELETE | `/api/users` | remove all users | JWT |
| POST | `/auth/signin` | sign in, returns a JWT | – |
| GET | `/auth/signout` | clears the token cookie | – |
| GET | `/api/protected` | demo protected route | JWT |

Send the token as a header: `Authorization: Bearer <token>`

## 5. Testing

**Postman** — import `postman/Portfolio_API.postman_collection.json`. Run
*01 - auth → POST signin* once; a script saves the token into the collection
variable, so every protected request afterwards works without pasting anything.

**Automated** — with the server running, in a second terminal:

```bash
node tools/smoke-test.mjs
```

It exercises all 28 endpoints, checks the auth guards, and deletes everything
it created.

## 6. Design notes

- **Password storage.** The plain password is never stored. It is set through a
  virtual field, hashed with PBKDF2 (SHA-512, 10,000 iterations) against a
  per-user random salt; only the hash and salt are saved. `toJSON` strips both
  from every response.
- **One CRUD factory.** Contacts, projects and qualifications need identical
  operations, so they are written once in `crud.factory.js` and bound per
  model. A bug gets fixed in one place instead of three. Users keep their own
  controller because passwords need different handling.
- **`express.js` separate from `server.js`.** The app knows nothing about ports
  or databases, so it can be imported and tested on its own.
- **Connect before listening.** `server.js` opens the database connection
  first and exits with a clear message if it fails, rather than accepting
  requests it cannot serve.
- **JWT verified directly.** The week 6 slides use `express-jwt`; this project
  verifies the token with `jsonwebtoken` in a short middleware. Same standard,
  same secret, one dependency fewer, and an error shape we control.
