import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Post } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, post

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  post = await Post.create({ user })
})

test('POST /posts 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, caption: 'test', likes: 'test', picture: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.caption).toEqual('test')
  expect(body.likes).toEqual('test')
  expect(body.picture).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /posts 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /posts 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /posts 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /posts/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${post.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(post.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /posts/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${post.id}`)
  expect(status).toBe(401)
})

test('GET /posts/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /posts/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${post.id}`)
    .send({ access_token: userSession, caption: 'test', likes: 'test', picture: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(post.id)
  expect(body.caption).toEqual('test')
  expect(body.likes).toEqual('test')
  expect(body.picture).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /posts/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${post.id}`)
    .send({ access_token: anotherSession, caption: 'test', likes: 'test', picture: 'test' })
  expect(status).toBe(401)
})

test('PUT /posts/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${post.id}`)
  expect(status).toBe(401)
})

test('PUT /posts/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, caption: 'test', likes: 'test', picture: 'test' })
  expect(status).toBe(404)
})

test('DELETE /posts/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${post.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /posts/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${post.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /posts/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${post.id}`)
  expect(status).toBe(401)
})

test('DELETE /posts/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
