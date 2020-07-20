import mongoose, { Schema } from 'mongoose'

const postSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  caption: {
    type: String
  },
  likes: [{
    type: Schema.ObjectId,
    ref: 'User'
  }],
  picture: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

postSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(),
      caption: this.caption,
      likes: this.likes,
      picture: this.picture,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Post', postSchema)

export const schema = model.schema
export default model
