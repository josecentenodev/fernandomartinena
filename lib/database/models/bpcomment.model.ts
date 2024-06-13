import { Schema, model, models } from "mongoose";

const BlogCommentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: Schema.Types.ObjectId, ref: 'BlogPost', required: true },
  content: { type: String, required: true, minlength: 1 },
  createdAt: { type: Date, default: Date.now },
});

// Índices
BlogCommentSchema.index({ userId: 1, postId: 1 });
BlogCommentSchema.index({ postId: 1 });

const BlogComment = models.BlogComment || model('BlogComment', BlogCommentSchema);

export default BlogComment;
