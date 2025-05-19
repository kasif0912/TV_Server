// models/Media.js
const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    banner: {
      type: String, // URL to the banner image
      required: true,
    },
    thumbnail: {
      type: String, // URL to the thumbnail image
      required: true,
    },
    video: {
      type: String, // URL or path to video content
      required: true,
    },
    categories: {
      type: [String], // e.g., ["Action", "Drama"]
      default: [],
    },
    languages: {
      type: [String], // e.g., ["English", "Hindi"]
      default: [],
    },
    cast: {
      type: [String], // list of actor names
      default: [],
    },
    releaseYear: {
      type: Date,
    },
    rating: {
      type: Number, // e.g., IMDb rating
      min: 0,
      max: 10,
    },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model(" Video", videoSchema);
module.exports = Video;
