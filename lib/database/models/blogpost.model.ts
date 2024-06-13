import { Schema, model, models } from "mongoose";

const BlogPostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Índices
BlogPostSchema.index({ authorId: 1 });
BlogPostSchema.index({ createdAt: 1 });

const BlogPost = models.BlogPost || model('BlogPost', BlogPostSchema);

export default BlogPost;
