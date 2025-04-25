import mongoose, { Schema, Document, Model } from "mongoose";

export interface Component {
  componentId: string;
  name: string;
  slider_image: {
    public_id: string;
    secure_url: string;
  };
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ✅ Extended interface for Mongoose documents
export interface ComponentDocument extends Document, Component {}

const componentSchema = new Schema<ComponentDocument>(
  {
    componentId: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    slider_image: {
      type: Object,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

const Sliders: Model<ComponentDocument> =
  mongoose.models.Slider ||
  mongoose.model<ComponentDocument>("Slider", componentSchema);

export default Sliders;
