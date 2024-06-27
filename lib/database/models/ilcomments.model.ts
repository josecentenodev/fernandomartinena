import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  artworkId: { type: Schema.Types.ObjectId, ref: 'Artwork', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Comment = models.Comment || model('Comment', CommentSchema);

export default Comment;
