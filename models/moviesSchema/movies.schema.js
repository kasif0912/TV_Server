// models/Media.js
import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    genre: { type: [String], required: true },
    language: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    cast: { type: [String], default: [] },
    director: { type: String, required: true },
    bannerUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    trailerUrl: { type: String, required: true },
    duration: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    isFree: { type: Boolean, default: false },
    releaseYear: { type: Number },
    type: { type: String, enum: ["movie", "series"], default: "movie" },
    featured: { type: Boolean, default: false },
    trending: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
    qualityLinks: {
      "720p": { type: String },
      "1080p": { type: String },
      "2K": { type: String },
      "4K": { type: String },
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
