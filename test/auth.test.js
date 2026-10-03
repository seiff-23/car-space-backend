const test = require('node:test');
const assert = require('node:assert/strict');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { register, login } = require('../controllers/authControllers');

function response() {
  return { statusCode: 200, body: null,
    status(code) { this.statusCode = code; return this; },
    send(body) { this.body = JSON.parse(JSON.stringify(body)); return this; } };
}

test('registration cannot grant administrator rights or expose the password hash', async (t) => {
  t.mock.method(User, 'findOne', async () => null);
  t.mock.method(User.prototype, 'save', async function () { return this; });
  t.mock.method(bcrypt, 'hash', async () => 'stored-password-hash');
  t.mock.method(jwt, 'sign', () => 'session-token');
  const res = response();
  await register({ body: { firstName: 'Test', lastName: 'User',
    email: 'test@example.com', password: 'test-password', isAdmin: true } }, res);
  assert.equal(res.statusCode, 201);
  assert.equal(res.body.user.isAdmin, false);
  assert.equal(res.body.user.password, undefined);
  assert.equal(res.body.user.email, 'test@example.com');
  assert.equal(res.body.token, 'session-token');
});

test('login returns user data without the password hash', async (t) => {
  const user = new User({ firstName: 'Test', lastName: 'User',
    email: 'test@example.com', password: 'stored-password-hash' });
  t.mock.method(User, 'findOne', async () => user);
  t.mock.method(bcrypt, 'compare', async () => true);
  t.mock.method(jwt, 'sign', () => 'session-token');
  const res = response();
  await login({ body: { email: 'test@example.com', password: 'test-password' } }, res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.user.password, undefined);
  assert.equal(res.body.user.email, 'test@example.com');
  assert.equal(user.password, 'stored-password-hash');
});

test('a database failure during login returns an error instead of leaving the request unanswered', async (t) => {
  t.mock.method(User, 'findOne', async () => { throw new Error('database unavailable'); });
  const res = response();
  await login({ body: { email: 'test@example.com', password: 'test-password' } }, res);
  assert.equal(res.statusCode, 500);
  assert.ok(res.body.errors.length);
  assert.ok(!JSON.stringify(res.body).includes('database unavailable'));
});

test('user JSON serialization also hides the password for the current-user endpoint', () => {
  const user = new User({ firstName: 'Test', lastName: 'User',
    email: 'test@example.com', password: 'stored-password-hash' });
  const result = JSON.parse(JSON.stringify({ user }));
  assert.equal(result.user.password, undefined);
  assert.equal(user.password, 'stored-password-hash');
});
