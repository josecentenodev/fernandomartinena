import { Schema, model, models } from "mongoose";

const BlogLikeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: Schema.Types.ObjectId, ref: 'BlogPost', required: true },
  createdAt: { type: Date, default: Date.now },
});

// Índices
BlogLikeSchema.index({ userId: 1, postId: 1 });
BlogLikeSchema.index({ postId: 1 });

const BlogLike = models.BlogLike || model('BlogLike', BlogLikeSchema);

export default BlogLike;
