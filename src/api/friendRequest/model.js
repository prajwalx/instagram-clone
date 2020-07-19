import mongoose, { Schema } from 'mongoose'
export const ACCEPTED = 'ACCEPTED'
export const REJECTED = 'REJECTED'
export const PENDING = 'PENDING'

const friendRequestSchema = new Schema({
  fromUser: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  toUser: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    default: PENDING
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

friendRequestSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      fromUser: this.fromUser.view(full),
      toUser: this.toUser.view(full),
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('FriendRequest', friendRequestSchema)

export const schema = model.schema
export default model
