import { Schema, model, models } from "mongoose";

const BannerSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  link: { type: String, default: null },
});

const Banner = models.Banner || model('Banner', BannerSchema);

export default Banner;
