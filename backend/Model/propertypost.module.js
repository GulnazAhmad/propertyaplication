import { Timestamp } from "bson";
import mongoose from "mongoose";
const PropertyPostSchema = mongoose.Schema(
  {
    propertyname: {
      type: String,
      required: true,
    },
    propertydescription: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
      enum: ["Odisha", "Karnataka", "Maharashtra", "Delhi"], // ✅ add states
    },
    city: {
      type: String,
      required: true,
      enum: ["Bhubaneswar", "Cuttack", "Pune", "Bangalore"], // ✅ add cities
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    squarefeet: {
      type: Number,
      required: true,
    },
    BHK: {
      type: String,
      required: true,
      enum: ["2BHK", "3BHK", "4BHK"],
    },
    ownerinfo: {
      type: String,
      required: true,
    },
    amenities: {
      type: [String],
      required: true,
      enum: [
        "parking",
        "lift",
        "park",
        "club house",
        "swimming pool",
        "gas pipeline",
        "generator",
        "security",
      ],
    },
    furnishingStatus: {
      type: String,
      required: true,
      enum: ["unfurnished", "semifurnished", "furnished"],
    },
    purchaseType: {
      type: String,
      required: true,
      enum: ["resale", "new booking"],
    },

    photos: {
      type: String,
      default: "",
    },
    videos: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
export const Property = mongoose.model("Property", PropertyPostSchema);
