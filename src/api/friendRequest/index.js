import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
import { Schema } from 'mongoose'
export FriendRequest, { schema, ACCEPTED, PENDING, REJECTED } from './model'

const router = new Router()
const { toUser, status } = schema.tree

/**
 * @api {post} /friendRequests Create friend request
 * @apiName CreateFriendRequest
 * @apiGroup FriendRequest
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam toUser Friend request's toUser.
 * @apiParam status Friend request's status.
 * @apiSuccess {Object} friendRequest Friend request's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Friend request not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ toUser, status }),
  create)

/**
 * @api {get} /friendRequests Retrieve friend requests
 * @apiName RetrieveFriendRequests
 * @apiGroup FriendRequest
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} friendRequests List of friend requests.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query({
    toUser: { type: Schema.ObjectId },
    fromUser: { type: Schema.ObjectId },
    status: String
  }),
  index)

/**
 * @api {get} /friendRequests/:id Retrieve friend request
 * @apiName RetrieveFriendRequest
 * @apiGroup FriendRequest
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} friendRequest Friend request's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Friend request not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /friendRequests/:id Update friend request
 * @apiName UpdateFriendRequest
 * @apiGroup FriendRequest
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam toUser Friend request's toUser.
 * @apiParam status Friend request's status.
 * @apiSuccess {Object} friendRequest Friend request's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Friend request not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ status }),
  update)

/**
 * @api {delete} /friendRequests/:id Delete friend request
 * @apiName DeleteFriendRequest
 * @apiGroup FriendRequest
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Friend request not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
