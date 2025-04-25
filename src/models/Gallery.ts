import mongoose, { Schema, Document, Model } from "mongoose";

export interface Gallery {
  galleryId: string;
  name: string;
  image: {
    public_id: string;
    secure_url: string;
  };
  status: boolean;
  type: string;
  video: string;
}

export interface GalleryDocument extends Document, Gallery {}

const gallerySchema = new Schema<GalleryDocument>(
  {
    galleryId: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    type: {
      type: String,
      required: true,
    },
    video: {
      type: String,
    },
  },
  { timestamps: true }
);

const Gallery: Model<GalleryDocument> =
  mongoose.models.Gallery ||
  mongoose.model<GalleryDocument>("Gallery", gallerySchema);

export default Gallery;
