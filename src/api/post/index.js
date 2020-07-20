import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, like, dislike, newsfeed } from './controller'
import { schema } from './model'
export Post, { schema } from './model'

const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, 'IMAGE-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }
}).single('myImage')

const router = new Router()
const { caption, likes, picture } = schema.tree

/**
 * @api {post} /posts Create post
 * @apiName CreatePost
 * @apiGroup Post
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam caption Post's caption.
 * @apiParam likes Post's likes.
 * @apiParam picture Post's picture.
 * @apiSuccess {Object} post Post's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Post not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  upload,
  body({ caption, likes, picture }),
  create)

/** Like */
router.post('/like/:id',
  token({ required: true }),
  like)

/** Dislike */
router.post('/dislike/:id',
  token({ required: true }),
  dislike)

/** Fetch newsFeed posts */
router.get('/myPosts',
  token({ required: true }),
  query(),
  newsfeed)

/**
 * @api {get} /posts Retrieve posts
 * @apiName RetrievePosts
 * @apiGroup Post
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} posts List of posts.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /posts/:id Retrieve post
 * @apiName RetrievePost
 * @apiGroup Post
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} post Post's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Post not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /posts/:id Update post
 * @apiName UpdatePost
 * @apiGroup Post
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam caption Post's caption.
 * @apiParam likes Post's likes.
 * @apiParam picture Post's picture.
 * @apiSuccess {Object} post Post's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Post not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ caption, likes, picture }),
  update)

/**
 * @api {delete} /posts/:id Delete post
 * @apiName DeletePost
 * @apiGroup Post
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Post not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
