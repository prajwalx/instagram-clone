import { FriendRequest } from '.'
import { User } from '../user'

let user, friendRequest

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  friendRequest = await FriendRequest.create({ fromUser: user, toUser: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = friendRequest.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(friendRequest.id)
    expect(typeof view.fromUser).toBe('object')
    expect(view.fromUser.id).toBe(user.id)
    expect(view.toUser).toBe(friendRequest.toUser)
    expect(view.status).toBe(friendRequest.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = friendRequest.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(friendRequest.id)
    expect(typeof view.fromUser).toBe('object')
    expect(view.fromUser.id).toBe(user.id)
    expect(view.toUser).toBe(friendRequest.toUser)
    expect(view.status).toBe(friendRequest.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
