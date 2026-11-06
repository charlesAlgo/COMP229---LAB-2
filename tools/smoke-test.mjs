/**
 * smoke-test.mjs - exercises every endpoint against a RUNNING server.
 *
 *   1. start MongoDB
 *   2. node server.js        (in one terminal)
 *   3. node tools/smoke-test.mjs   (in another)
 *
 * It uses only built-in fetch, so there is nothing to install. Every line it
 * prints is a real HTTP request against your own database - which makes its
 * output a legitimate screenshot for the report, alongside Postman.
 *
 * It cleans up after itself: every document it creates, it deletes.
 */
const BASE = process.env.BASE_URL || 'http://localhost:3000'
const EMAIL = `smoketest_${Date.now()}@example.com`
const PASSWORD = 'Portfolio2026'

let pass = 0
let fail = 0
const check = (label, ok, detail = '') => {
  if (ok) {
    pass++
    console.log(`  PASS  ${label}`)
  } else {
    fail++
    console.log(`  FAIL  ${label}  ${detail}`)
  }
}

const call = async (method, path, { body, token } = {}) => {
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(BASE + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
  let data = null
  try {
    data = await res.json()
  } catch {
    data = null
  }
  return { status: res.status, data }
}

const run = async () => {
  console.log(`\nSmoke test against ${BASE}\n`)

  // ---- welcome message -------------------------------------------------
  let r = await call('GET', '/')
  check('GET /  welcome message', r.status === 200 && /Welcome to MyPortfolio/.test(r.data?.message || ''), JSON.stringify(r.data))

  // ---- user + auth -----------------------------------------------------
  r = await call('POST', '/api/users', { body: { name: 'Smoke Test', email: EMAIL, password: PASSWORD } })
  check('POST /api/users  register', r.status === 201, JSON.stringify(r.data))
  const userId = r.data?.data?._id
  check('password hash not returned', !!r.data?.data && !('hashed_password' in r.data.data))

  r = await call('POST', '/auth/signin', { body: { email: EMAIL, password: 'wrong-password' } })
  check('POST /auth/signin  wrong password -> 401', r.status === 401)

  r = await call('POST', '/auth/signin', { body: { email: EMAIL, password: PASSWORD } })
  check('POST /auth/signin  returns JWT', r.status === 200 && (r.data?.token || '').split('.').length === 3)
  const token = r.data?.token

  r = await call('GET', '/api/protected')
  check('GET /api/protected  no token -> 401', r.status === 401)
  r = await call('GET', '/api/protected', { token })
  check('GET /api/protected  with token -> 200', r.status === 200, JSON.stringify(r.data))

  // ---- the three content resources -------------------------------------
  const payloads = {
    contacts: { firstname: 'Ada', lastname: 'Lovelace', email: 'ada@example.com', message: 'Hello from the smoke test' },
    projects: { title: 'Smoke test project', firstname: 'Charles', lastname: 'Shalua', email: EMAIL, completion: '2026-10-11', description: 'Created by the smoke test' },
    qualifications: { title: 'Smoke test qualification', firstname: 'Charles', lastname: 'Shalua', email: EMAIL, completion: '2028-04-30', description: 'Created by the smoke test' },
  }

  for (const [resource, payload] of Object.entries(payloads)) {
    console.log(`\n  --- /api/${resource} ---`)

    if (resource !== 'contacts') {
      r = await call('POST', `/api/${resource}`, { body: payload })
      check(`POST /api/${resource}  without token -> 401`, r.status === 401, JSON.stringify(r.data))
    }

    r = await call('POST', `/api/${resource}`, { body: payload, token })
    check(`POST /api/${resource}  create`, r.status === 201, JSON.stringify(r.data))
    const id = r.data?.data?._id

    r = await call('GET', `/api/${resource}`)
    check(`GET /api/${resource}  list (${Array.isArray(r.data) ? r.data.length : '?'} rows)`, r.status === 200 && Array.isArray(r.data))

    r = await call('GET', `/api/${resource}/${id}`)
    check(`GET /api/${resource}/:id  read one`, r.status === 200 && r.data?._id === id)

    r = await call('PUT', `/api/${resource}/${id}`, { body: { description: 'updated by smoke test', message: 'updated by smoke test' }, token })
    check(`PUT /api/${resource}/:id  update`, r.status === 200, JSON.stringify(r.data))

    r = await call('GET', `/api/${resource}/000000000000000000000000`)
    check(`GET /api/${resource}/<missing>  -> 404`, r.status === 404)

    r = await call('GET', `/api/${resource}/not-a-valid-id`)
    check(`GET /api/${resource}/<malformed>  -> 400`, r.status === 400)

    r = await call('DELETE', `/api/${resource}/${id}`, { token })
    check(`DELETE /api/${resource}/:id  remove`, r.status === 200, JSON.stringify(r.data))
  }

  // ---- ownership guard --------------------------------------------------
  console.log('\n  --- authorisation ---')
  const otherEmail = `other_${Date.now()}@example.com`
  r = await call('POST', '/api/users', { body: { name: 'Other', email: otherEmail, password: PASSWORD } })
  const otherId = r.data?.data?._id
  r = await call('PUT', `/api/users/${otherId}`, { body: { name: 'hacked' }, token })
  check('PUT another user -> 403', r.status === 403, JSON.stringify(r.data))
  r = await call('PUT', `/api/users/${userId}`, { body: { name: 'Smoke Test (updated)' }, token })
  check('PUT own record -> 200', r.status === 200, JSON.stringify(r.data))

  // ---- clean up ---------------------------------------------------------
  console.log('\n  --- cleanup ---')
  const other = await call('POST', '/auth/signin', { body: { email: otherEmail, password: PASSWORD } })
  r = await call('DELETE', `/api/users/${otherId}`, { token: other.data?.token })
  check('DELETE other test user', r.status === 200)
  r = await call('DELETE', `/api/users/${userId}`, { token })
  check('DELETE own test user', r.status === 200)
  r = await call('GET', '/auth/signout')
  check('GET /auth/signout', r.status === 200)

  console.log(`\n${pass} passed, ${fail} failed\n`)
  process.exit(fail ? 1 : 0)
}

run().catch((err) => {
  console.error('\nCould not reach the server. Is it running on ' + BASE + ' ?')
  console.error(err.message)
  process.exit(1)
})
