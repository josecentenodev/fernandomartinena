import { Schema, model, models } from "mongoose";

const LikeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  artworkId: { type: Schema.Types.ObjectId, ref: 'Artwork', required: true },
  createdAt: { type: Date, default: Date.now },
});

const Like = models.Like || model('Like', LikeSchema);

export default Like;
