import { Schema, model, models } from "mongoose";

const IllustrationSchema = new Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Illustration = models.Illustration || model('Illustration', IllustrationSchema);

export default Illustration;
