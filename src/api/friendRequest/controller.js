import { success, notFound, authorOrAdmin } from '../../services/response/'
import User from '../user/model'
import { FriendRequest, ACCEPTED } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  FriendRequest.create({ ...body, fromUser: user })
    .then((friendRequest) => friendRequest.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  FriendRequest.find(query, select, cursor)
    .populate('toUser')
    .then((friendRequests) => friendRequests.map((friendRequest) => friendRequest.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  FriendRequest.findById(params.id)
    .populate('fromUser')
    .then(notFound(res))
    .then((friendRequest) => friendRequest ? friendRequest.view() : null)
    .then(success(res))
    .catch(next)

/* TODO Update users friend list on Accept only nothing otherwise */
export const update = ({ user, bodymen: { body }, params }, res, next) =>
  FriendRequest.findById(params.id)
    .populate('fromUser')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'toUser'))
    .then((friendRequest) => friendRequest ? Object.assign(friendRequest, body).save() : null)
    .then((friendRequest) => friendRequest ? friendRequest.view(true) : null)
    .then(async (friendRequest) => {
      if (friendRequest && friendRequest.status === ACCEPTED) {
        await UpdateFriends(friendRequest.fromUser.id, friendRequest.toUser.id, res, next)
        await UpdateFriends(friendRequest.toUser.id, friendRequest.fromUser.id, res, next)
        return friendRequest
      } else return null
    })
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  FriendRequest.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'fromUser'))
    .then((friendRequest) => friendRequest ? friendRequest.remove() : null)
    .then(success(res, 204))
    .catch(next)

const UpdateFriends = (userId, friendId, res, next) =>
  User.findById(userId)
    .then(notFound(res))
    .then((user) => {
      if (user) { user.friends.addToSet(friendId) }
      return user
    })
    .then((user) => user ? user.save() : null)
    .then((user) => user ? user.view(true) : null)
    .catch(next)
