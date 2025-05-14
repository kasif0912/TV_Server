const Media = require("../models/media.schema");
const { uploadOnCloudinary } = require("../utils/cloudinary");

const createMedia = async (req, res) => {
  try {
    const { title, description, categories, languages, cast, releaseYear, rating } = req.body;

    // Check files
    if (!req.files || !req.files.banner || !req.files.video) {
      return res.status(400).json({ error: "Banner and video files are required" });
    }

    const bannerFile = req.files.banner[0];
    const videoFile = req.files.video[0];

    // Upload to Cloudinary
    const bannerUpload = await uploadOnCloudinary(bannerFile.path);
    const videoUpload = await uploadOnCloudinary(videoFile.path);

    if (!bannerUpload || !videoUpload) {
      return res.status(500).json({ error: "Failed to upload media to Cloudinary" });
    }

    // Create media entry
    const media = new Media({
      title,
      description,
      banner: bannerUpload.secure_url,
      video: videoUpload.secure_url,
      categories: categories ? categories.split(",") : [],
      languages: languages ? languages.split(",") : [],
      cast: cast ? cast.split(",") : [],
      releaseYear,
      rating,
    });

    await media.save();

    res.status(201).json({ success: true, media });
  } catch (error) {
    console.error("Create Media Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createMedia };
