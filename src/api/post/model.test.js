import { Post } from '.'
import { User } from '../user'

let user, post

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  post = await Post.create({ user, caption: 'test', likes: 'test', picture: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = post.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(post.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.caption).toBe(post.caption)
    expect(view.likes).toBe(post.likes)
    expect(view.picture).toBe(post.picture)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = post.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(post.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.caption).toBe(post.caption)
    expect(view.likes).toBe(post.likes)
    expect(view.picture).toBe(post.picture)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
