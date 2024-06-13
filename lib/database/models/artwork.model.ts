import { Schema, model, models } from "mongoose";

const ArtworkSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

const Artwork = models.Artwork || model('Artwork', ArtworkSchema);

export default Artwork;
