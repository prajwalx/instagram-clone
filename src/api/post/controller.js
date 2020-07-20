import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Post } from '.'

export const create = ({ user, bodymen: { body }, file }, res, next) =>
  Post.create({ ...body, user, picture: file.path })
    .then((post) => post.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Post.find(query, select, cursor)
    .populate('user')
    .then((posts) => posts.map((post) => post.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Post.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((post) => post ? post.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Post.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((post) => post ? Object.assign(post, body).save() : null)
    .then((post) => post ? post.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Post.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((post) => post ? post.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const like = ({ user, params }, res, next) =>
  Post.findById(params.id)
    .then(notFound(res))
    .then((post) => {
      if (post) { post.likes.addToSet(user.id) }
      return post
    })
    .then((post) => post ? post.save() : null)
    .then((post) => post ? post.view() : null)
    .then(success(res))
    .catch(next)

export const dislike = ({ user, params }, res, next) =>
  Post.findById(params.id)
    .then(notFound(res))
    .then((post) => {
      if (post) { post.likes.pull(user.id) }
      return post
    })
    .then((post) => post ? post.save() : null)
    .then((post) => post ? post.view() : null)
    .then(success(res))
    .catch(next)

export const newsfeed = ({ user, querymen: { query, select, cursor } }, res, next) => {
  const friends = user.friends.map((friend) => friend.id)
  Post.find(query, select, cursor)
    .where('user')
    .in(friends)
    .populate('user')
    .then((posts) => posts.map((post) => post.view()))
    .then(success(res))
    .catch(next)
}
