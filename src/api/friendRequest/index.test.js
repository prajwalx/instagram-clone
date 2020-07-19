import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { FriendRequest } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, friendRequest

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  friendRequest = await FriendRequest.create({ fromUser: user })
})

test('POST /friendRequests 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, toUser: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.toUser).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.fromUser).toEqual('object')
})

test('POST /friendRequests 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /friendRequests 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].fromUser).toEqual('object')
})

test('GET /friendRequests 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /friendRequests/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${friendRequest.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(friendRequest.id)
  expect(typeof body.fromUser).toEqual('object')
})

test('GET /friendRequests/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${friendRequest.id}`)
  expect(status).toBe(401)
})

test('GET /friendRequests/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /friendRequests/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${friendRequest.id}`)
    .send({ access_token: userSession, toUser: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(friendRequest.id)
  expect(body.toUser).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.fromUser).toEqual('object')
})

test('PUT /friendRequests/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${friendRequest.id}`)
    .send({ access_token: anotherSession, toUser: 'test', status: 'test' })
  expect(status).toBe(401)
})

test('PUT /friendRequests/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${friendRequest.id}`)
  expect(status).toBe(401)
})

test('PUT /friendRequests/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, toUser: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /friendRequests/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${friendRequest.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /friendRequests/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${friendRequest.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /friendRequests/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${friendRequest.id}`)
  expect(status).toBe(401)
})

test('DELETE /friendRequests/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
